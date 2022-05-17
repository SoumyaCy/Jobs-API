const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:2,
    },
    email:{
         type:String,
         required:[true,'please provide your email'],
         match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address'
         ],
         unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minLength:6
    }
})

userSchema.pre('save', async function() {
  // do stuff
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt)
});

userSchema.methods.getJWT=function(){
    return jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'});
}

userSchema.methods.checkPassword=async function(toCheckPassword){
    return await bcrypt.compare(toCheckPassword,this.password)
    
}

module.exports=mongoose.model('User',userSchema);