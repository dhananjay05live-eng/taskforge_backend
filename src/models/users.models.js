import mongoose from "mongoose";
import argon2 from "argon2";


const userSchema = new mongoose.Schema (
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        refreshToken:{
            type:String,
        }
    },
    {timestamps:true})


    userSchema.pre('save',async function(){
        if(!this.isModified("password")){
            return
        }
        try {
            this.password = await argon2.hash(this.password)
        } catch (error) {
            console.log("password hasing failed",error)
            throw error
        }
    });

    userSchema.methods.isPasswordCorrect = async function(password){
        try {
            return await argon2.verify(this.password,password);
        } catch (error) {
            console.log("error while verifying",error);
            throw error
        }
    }


export const User = mongoose.model("User",userSchema);