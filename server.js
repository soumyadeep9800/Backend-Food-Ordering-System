const express=require('express');
const app=express();
const port=3000;
const db = require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());


const userAuth=require('./routes/authUser');
app.use('/',userAuth);
const adminAuth=require('./routes/authAdmin');
app.use('/admin',adminAuth);





app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})