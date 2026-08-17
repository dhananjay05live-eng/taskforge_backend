import jwt from "jsonwebtoken";


const generateRefreshToken = (user)=>{
    const refreshToken = jwt.sign({
        _id: user._id
      },process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
      return refreshToken;
}

const generateAccessToken = (user)=>{
    const accessToken = jwt.sign({
        _id: user._id,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
      return accessToken;
}


export {generateAccessToken,generateRefreshToken}