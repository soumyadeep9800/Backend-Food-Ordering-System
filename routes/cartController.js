const express=require('express');
const router=express.Router();
const {jwtAuthMiddleware}=require('../jwt');
const User=require('../models/userModel');

router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userID=req.user.id;
        const {itemName,quantity,price}=req.body;
        const user=await User.findById(userID);
        if(!user) return res.status(404).json({message:'user not found'});
        user.cart.push({itemName,quantity,price});
        await user.save();
        res.status(200).json({message: 'Item added to cart', cart: user.cart });
        console.log(user.cart);
    } catch (error) {
        console.log('Failed to add item to cart', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userID=req.user.id;
        const user=await User.findById(userID);
        if(!user) return res.status(404).json({message:'user not found'});
        console.log(user.cart);
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.log('Failed to view cart',error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;