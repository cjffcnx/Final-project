// Authentication related next function

// Logic to verify JWT token and authenticate user

//Import the token
// We need to decrypt the token

//Before that we need to verify that

//What to do when the next function is called is the sole purpose of the middleware



const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: "No token provided or invalid format"
            });
        }

        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Auth failed"
                });

            } else {
                req.userId = decode.userId;
                next();
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Auth failed",
            error
        })
    }

}
