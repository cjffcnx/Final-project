const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerController = async (req, res) => {
    // Handling the error and the response


    try {

        // We find the existing user in the userModel
        const existingUser = await userModel.findOne({
            email: req.body.email

        })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }

        // If user doesnot exist then we need to save the email and the password so to save this
        // Creating a salt here genSalt 10 means 10 rounds can be made

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Replace the normal password with the hashed password
        req.body.password = hashPassword;

        //rest data
        const user = new userModel(req.body);
        const savedUser = await user.save();
        return res.status(201).send({
            success: true,
            message: "User registered succesfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
                createdAt: savedUser.createdAt
            }
        })

    }
    catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in the register api",
            error
        })
    }
}


//login callback
const loginController = async (req, res) => {
    try {

        //Check the user first if the user exist
        const user = await userModel.findOne({
            email: req.body.email
        })

        // What if the user does not exist
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //Compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: "User logged in succesfully",
            token,
            user
        })
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in the login api",
            error
        })
    }

}

// GET CURRENT USER
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password')
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user
        })
    }
    catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Unable to get the current user",
            error
        })
    }

}

module.exports = { registerController, loginController, currentUserController };