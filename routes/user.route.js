const express= require("express");
const bcrypt= require("bcrypt")
const UserModel= require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv= require("dotenv")
dotenv.config()

const userRouter= express.Router();

userRouter.post('/register', (req, res)=>{
    let {name, email, password, gender, number}= req.body;

    try {
        bcrypt.hash(password, 2, async(err, hash)=>{
            
            if(err){
                return res.send('error while hashing password');
            }
            // 39 min
            let user= new UserModel({name, email, password: hash, gender, number});
            await user.save()
            res.send({"message":"New User Registered"})

        })
    } catch (error) {
        res.send({"message":`Registration failed ${error}`})
    }

})

userRouter.post('/login', async(req, res)=>{
    let {email, password}= req.body;
    try {
        const user= await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err){
                    res.status(404).send(`error while comparing password- ${err}`);
                }
    
                if(result){
                    let token= jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET);
                    res.status(200).send({"msg":"User Logged in successful", "token": token})
                }else{
                    res.status(401).send("Your password is wrong")
                }
            })
        }else{
            res.status(401).send('User Not found or Invalid Credentials')
        }
    } catch (error) {
        res.send("Internal server error || Error in loggin in user", error.message)
    }

})

module.exports= userRouter;