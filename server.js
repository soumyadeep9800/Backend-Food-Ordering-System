const express=require('express');
const app=express();
const port=3000;
const db = require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());












app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})