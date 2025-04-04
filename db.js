const mongoose=require('mongoose');

const mongoURL= 'mongodb://localhost:27017/foodeOrdering';

mongoose.connect(mongoURL)
   .then(()=> console.log('connected to MongoDB server'))
   .catch((err)=> console.log('MongoDB connection error',err));

const db=mongoose.connection;

module.exports=db;