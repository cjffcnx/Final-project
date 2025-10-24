const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");

const createInventoryController = async (req, res) => {

    try {
        const { email, inventoryType } = req.body;

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

        // Save donor/hospital email if provided (allow 'NA' or empty)
        if (email && email !== 'NA') {
            inventoryData.donarEmail = email;
            // Try to find the user but do not fail if not found
            const user = await userModel.findOne({ email });
            if (user) {
                // if inventory type is 'in' expect a donor account
                if (inventoryType === 'in' && user.role === 'donar') {
                    inventoryData.donar = user._id;
                }
                // if inventory type is 'out' expect a hospital account
                else if (inventoryType === 'out' && user.role === 'hospital') {
                    inventoryData.hospital = user._id;
                }
            }
        }

        const inventory = new inventoryModel(inventoryData);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: "New Blood Record Added",
            inventory
        });

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