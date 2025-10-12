const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");

const createInventoryController = async (req, res) => {

    try {
        const { email, inventoryType } = req.body

        // Validation of we receive the user or not
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        if (inventoryType === 'in' && user.role !== 'donar') {
            throw new Error("Not a donar account");
        }

        if (inventoryType === 'out' && user.role !== 'hospital') {
            throw new Error("Not a receiver account");
        }

        // Get the current logged-in user (organisation)
        const currentUser = await userModel.findById(req.userId);
        if (!currentUser || currentUser.role !== 'organisation') {
            throw new Error("Only organisations can create inventory records");
        }

        // Prepare inventory data
        const inventoryData = {
            inventoryType: req.body.inventoryType,
            bloodGroup: req.body.bloodGroup,
            quantity: req.body.quantity,
            organisation: req.userId, // Current logged-in organization
        };

        // Set donar or hospital based on inventory type
        if (inventoryType === 'in') {
            inventoryData.donar = user._id;
        } else if (inventoryType === 'out') {
            inventoryData.hospital = user._id;
        }

        const inventory = new inventoryModel(inventoryData);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: "New Blood Record Added",
            inventory
        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in the create inventory api",
            error: error.message
        })
    }
}

const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find({ organisation: req.userId })
            .populate('donar').populate('hospital')
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "Get all records successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in get all inventory",
            error: error.message
        })
    }
}
module.exports = { createInventoryController, getInventoryController }