const express=require('express');
const router=express.Router();
const Restaurant=require('../models/restaurantModel');
const {jwtAuthMiddleware}=require('../jwt');

router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const restaurants = await Restaurant.find();
        console.log(restaurants);
        res.status(200).json(restaurants);
    } catch (error) {
        console.log('internal server error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;