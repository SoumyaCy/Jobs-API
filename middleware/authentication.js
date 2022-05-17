const User= require("../models/User");
const jwt=require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


const auth=async (req,res,next)=>{

const bearer= req.headers.authorization;
// console.log(bearer);
if(!bearer||!bearer.startsWith('Bearer')){
    throw new UnauthenticatedError('Unauthorized access')
}
const payload=bearer.split(' ')[1];
try {
   const verified= jwt.verify(payload,process.env.JWT_SECRET) 
   
//    console.log(verified);
   const{userID,name}=verified;
   req.user={userID,name}
   next();
} catch (error) {
    throw new UnauthenticatedError('Unauthorized access')
}
}

module.exports=auth;