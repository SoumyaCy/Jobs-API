const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const Job=require("../models/Job");



const getAllJobs= async (req,res)=>{
    const allJobs=await Job.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({allJobs,count:allJobs.length});
}
const getSingleJob= async (req,res)=>{
    const {userID}=req.user;
    const {id:jobID}=req.params;
    // console.log(jobID,userID);

    const singleJob=await Job.findOne({_id:jobID,createdBy:userID});
    if(!singleJob){
        throw new NotFoundError(`No job found with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({singleJob});
}
const createJob= async (req,res)=>{
    req.body.createdBy=req.user.userID;
    const job=await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}
const updateJob= async (req,res)=>{
    const {userID}=req.user;
    const {id:jobID}=req.params;
    const {company,position}=req.body;
    if(!company||!position){
        throw new BadRequestError('Company and Position fields cannot be empty')
    }
    const updatedJob= await Job.findByIdAndUpdate({_id:jobID,createdBy:userID},req.body,{new:true,runValidators:true});
    if(!updatedJob){
        throw new NotFoundError(`No job found with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({updatedJob});
    
}
const deleteJob= async (req,res)=>{
    const {userID}=req.user;
    const {id:jobID}=req.params;
    const deleteJob=await Job.findByIdAndRemove({_id:jobID,createdBy:userID})

    if(!deleteJob){
        throw new NotFoundError(`No job found with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({msg:"job deleted"});
}

module.exports={getAllJobs,getSingleJob,createJob,updateJob,deleteJob};