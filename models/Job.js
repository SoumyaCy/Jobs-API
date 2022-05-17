const mongoose =require('mongoose');

const JobSchema= new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide the name of the comapny'],

    },
    position:{
        type:String,
        required:[true,'please provide the position']
    },
    status:{
        type:String,
        enum:['Interview','Pending','Declined'],
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,'Please enter userID']
    }
},{timestamps:true})

module.exports= mongoose.model('Jobs',JobSchema)