const jwt=require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware=(req,res,next)=>{
    const authheder=req.headers.authorization;
    if(!authheder) return res.status(401).json({erroe:'unauthorized'});
    try {
        const token=authheder.split(" ")[1];
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log("middleware error invalid token");
        res.status(400).json({error:'invalid token'});
    }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={
    jwtAuthMiddleware,
    generateToken
}