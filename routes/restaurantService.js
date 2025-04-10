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

router.get('/search', jwtAuthMiddleware, async (req, res) => {
    try {  //GET http://localhost:3000/restaurant/search?name=domino
        const name = req.query.name;  // <-- correct way
        const result = await Restaurant.find({name: { $regex: name, $options: 'i' }}); // i => ignore case
        if(result.length === 0){
            console.log('not available');
            return res.status(404).json({ message: 'Not Available' });
        }
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        console.log('Internal Server Error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports=router;