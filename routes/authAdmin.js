const express=require('express');
const router=express.Router();
const Admin=require('../models/adminModel');
const {generateToken}=require('../jwt');

router.post('/signup',async (req,res)=>{
    try {
        const data=req.body;
        const newAdmin=new Admin(data);
        const saveAdmin=await newAdmin.save();
        console.log('admin saved');
        const payload={
            id:saveAdmin.id
        }
        const token=generateToken(payload);
        res.status(200).json({token})
    } catch (error) {
        console.log('failed to save person');
        res.status(500).json({error:'internal server error'});
    }
});

router.post('/login',async(req,res)=>{
    try {
        const{email,password}=req.body;
        const admin=await Admin.findOne({email:email});
        if(!admin || !await(admin.comparePassword(password))){
            console.log('invalid username or password');
            res.status(401).json({error:'invalid username or password'});
        }
        const payload={
            id:admin.id
        }
        const token=generateToken(payload);
        console.log('login admin succesfully');
        res.status(200).json({message:'admin login succesfully'});
    } catch (error) {
        console.log('failed to save person');
        res.status(500).json({error:'internal server error'});
    }
});

module.exports=router;