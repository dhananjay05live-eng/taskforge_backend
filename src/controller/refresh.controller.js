import { User } from "../models/users.models.js";
import { generateAccessToken } from "../utils/token.js";

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const accessToken = generateAccessToken(user);

        return res
            .status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false
            })
            .json({
                message: "Access token refreshed"
            });

    } catch (error) {
        return res.status(400).json({
            message: "Failed to refresh access token",
            error: error.message
        });
    }
};