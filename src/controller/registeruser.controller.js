import { User } from "../models/users.models.js";




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


export {registerUser};