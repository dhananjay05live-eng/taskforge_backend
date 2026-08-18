import { User } from "../models/users.models.js";


const refreshExpiredTokens = async(req,res)=>{
    
try {
        const user = await User.find(req.user._id);
        if(user.refreshToken === req.cookies?.refreshToken){
            const accesssToken = generateAccessToken(user);
    
            return res
                    .status(200)
                    .cookie('accessToken',accessToken,{
                        httpOnly:true,
                        secure:false
                    })
        }
} catch (error) {
    return res
    .status(400)
    .json({"message":"invalid refresh tokens",
        "error":error
    })
}

}