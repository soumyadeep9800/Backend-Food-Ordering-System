const express=require('express');
const router=express.Router();
const User=require('../models/userModel');
const {generateToken} =require('../jwt');

router.post('/signup',async(req,res)=>{
    try {
        const data=req.body;
        const newUser=new User(data);
        const saveUser=await newUser.save();
        console.log(saveUser);
        const payload={
            id:saveUser.id
        }
        const token=generateToken(payload);
        console.log(token);
        res.status(200).json({message:'save user succesfully',token});
    } catch (error) {
        console.log('failed to save person');
        res.status(500).json({error:'internal server error'});
    }
});

router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'});
        }
        const payload={
            id:user.id
        }
        const token=generateToken(payload);
        res.status(200).json({token});
        // console.log(token);
        console.log('user login succesfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'});
    }
});


module.exports=router;