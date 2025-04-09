const express=require('express');
const app=express();
const port=3000;
const db = require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());


const userAuth=require('./routes/authUser');
app.use('/user',userAuth);
const adminAuth=require('./routes/authAdmin');
app.use('/admin',adminAuth);
const adminController=require('./routes/adminRestaurantController');
app.use('/admin',adminController);
const restaurantService=require('./routes/restaurantService');
app.use('/restaurant',restaurantService);




app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})