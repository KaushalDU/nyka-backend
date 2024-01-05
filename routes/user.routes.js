const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err){
            res.status(200).send({"error":err})
           }else{
            const user = new UserModel({name,email,password:hash})
            await user.save()
            res.status(200).send({"msg":"A new user registered"})
           }
        });     
    }catch{
       res.status(400).send({"error":err})
    }


})


userRouter.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  try{
     const user = await UserModel.findOne({email})
     bcrypt.compare(password, user.password,(err, result)=> {
      if(result){
        const token = jwt.sign({course:"RM101"},"masai")
        res.status(200).send({"msg":"Login Successful!","token":token})
      }else {
        res.status(200).send({"error":"Wrong credentials"})
      }
  });
  }catch(err){
    res.status(400).send({"error":err})
  }

})

module.exports = {
  userRouter
}

