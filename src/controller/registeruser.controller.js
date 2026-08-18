import { User } from "../models/users.models.js";
import {generateAccessToken,generateRefreshToken} from "../utils/token.js"




const registerUser = async(req,res)=>{
try {
        const requiredFields = ["username","email","password"];
    
        const user = {};
    
        for(const  field of requiredFields){
            if(!req.body[field]){
                return res .status(400)
                            .json({"message":"bad request!, enter the required field"});
            }else{
                user[field] = req.body[field];
            }
        }

        const existingUser = await User.findOne({
            $or:[
                {email:user.email},
                {username:user.username}
            ]
        });

        if(existingUser){
            return res
                    .status(409)
                    .json({
                        "message":"user already exists",
                    })
        }
        
        const newUser = new User(user);
        await newUser.save();
    
        return res
                .status(201)
                .json({"message":"user created successfully",
                    "User": {"email":newUser.email,
                            "username":newUser.username,
                            "id": newUser._id}
                })
} catch (error) {
    return res
            .status(500)
            .json({"message":"user registration failed!",
                "error":error
            })
}


}

const userLogin  = async(req,res)=>{

    const {email,username,password} = req.body;

    if(!email && !username){
        return res
                .status(400)
                .json({"message":"Bad request!,email or username is required"})
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    }).select("+password")

    if(user===null){
        return res
                .status(400)
                .json({"message":"user does not exists"})
    }

    if(!password){
        return res
                .status(400)
                .json({"message":"password is required field"})
    }

    const isCorrect = await user.isPasswordCorrect(password);
    if(!isCorrect){
        return res
                .status(400)
                .json({"message":"invalid credentials!"})
    }

try {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await User.findByIdAndUpdate(
            user._id,
            { refreshToken }
        );
        return res
                .status(200)
                .cookie('accessToken',accessToken,{
                    httpOnly:true,
                    secure:false
                })
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false
                })
                .json({
                    "message":"login successful"
                })
    } catch (error) {
    return res.status(500)
                .json({"message":"login failed"})
}

}

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            try {
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET
                );

                await User.findByIdAndUpdate(
                    decoded._id,
                    { $unset: { refreshToken: 1 } }
                );
            } catch (error) {
            }
        }

        return res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .status(200)
            .json({
                message: "Logged out successfully"
            });

    } catch (error) {
        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        });
    }
};


export {registerUser,userLogin,logoutUser};