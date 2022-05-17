const User=require('../models/User')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require('../errors');


const registerUser= async (req,res)=>{
    
    const user=await User.create({...req.body});

    const token=user.getJWT();
    
    res.status(StatusCodes.CREATED).json({user:user.name,token});
} 
const loginUser= async (req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        throw new BadRequestError('Please provide email and password');
    }
    const user=await User.findOne({email})
    
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const passwordMatch=await user.checkPassword(password);

    if(!passwordMatch){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const loginToken=user.getJWT();
   
    res.status(StatusCodes.OK).json({user:user.name,loginToken});
} 

module.exports={registerUser,loginUser}