import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: access token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.log("verification failed!", error);

        return res.status(401).json({
            message: "Invalid or expired access token"
        });
    }
};

export {verifyJWT}