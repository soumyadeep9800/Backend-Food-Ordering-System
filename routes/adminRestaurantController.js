const express=require('express');
const router=express.Router();
const Restaurant=require('../models/restaurantModel');
const Admin=require('../models/adminModel');
const { jwtAuthMiddleware } = require('../jwt');
const checkAdmin=async(userID)=>{
    try {
        const user=await Admin.findById(userID);
        if(user){
            return true;
        }
    } catch (error) {
        return false;
    }
}
router.post('/restaurants',jwtAuthMiddleware,async(req,res)=>{
    try {
        if(!await (checkAdmin(req.user.id))){
            return res.status(403).json({message:'Access Denied! Admin only area.'});
        }
        const data=req.body;
        const newRestaurant= new Restaurant(data);
        const saveRestaurant=await newRestaurant.save();
        console.log(saveRestaurant);
        res.status(200).json({message:'new restaurant saved'})
    } catch (error) {
        console.log('failed to save restaurant');
        res.status(500).json({error:'internal server error or give diffrent description'});
    }
});

router.delete('/restaurants/:id',jwtAuthMiddleware,async (req,res)=>{
    try {
        if(!await (checkAdmin(req.user.id))){
            return res.status(403).json({message:'Access Denied! Admin only area.'});
        }
        const restaurantId=req.params.id;
        const response=await Restaurant.findByIdAndDelete(restaurantId);
        if(!response){
            return res.status(404).json({error:'restaurant not found'});
        }
        console.log('restaurant data deleted');
        res.status(200).json({message:'restaurant deleted'});
    } catch (error) {
        console.log('failed to delete restaurant',error);
        res.status(500).json({error:'internal server error'});
    }
});

router.put('/restaurants/:id',jwtAuthMiddleware,async(req,res)=>{
    try {
        if(!await (checkAdmin(req.user.id))){
            return res.status(403).json({message:'Access Denied! Admin only area.'});
        }
        const restaurantID=req.params.id;
        const updateData=req.body;
        const response=await Restaurant.findByIdAndUpdate(restaurantID,updateData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({message:'restaurant not found'});
        }
        console.log('restaurant updated succesfully');
        res.status(200).json({message:'updated restaurant'});
    } catch (error) {
        console.log('failed to update restaurant',error);
        res.status(500).json({error:'internal server error'});
    }
})
module.exports=router;