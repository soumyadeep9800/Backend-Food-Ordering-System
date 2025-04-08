const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
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
    }
},{ timestamps: true });

adminSchema.pre('save',async function(next){
    const admin=this;
    if(!admin.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(admin.password,salt);
        admin.password=hashPassword;
    } catch (error) {
        return next(error);
    }
});

adminSchema.methods.comparePassword=async function(adminPassword){
    try {
        const isMatch=await bcrypt.compare(adminPassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;