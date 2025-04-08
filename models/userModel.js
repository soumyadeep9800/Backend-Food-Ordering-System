const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    cart:[
        {
            itemName: String,
            quantity: Number,
            price: Number
        }
    ]
},{ timestamps: true });

userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(user.password,salt);
        user.password=hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword=async function(userPassword){
    try {
        const isMatch=await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User;