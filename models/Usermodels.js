const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
name:{type:String,
    required:[true,"Please Enter your Name"]
    },
    email:{
        type:String,
        unique:true,
       

    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[6,"Minium length should be 6"],
     
        
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",

    },
   
    profileImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    }, 



  
},{
    timestamps:true
})

UserSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();    
});
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}
UserSchema.methods.getJWTToken= function (){
    return jwt.sign({_id:this._id},process.env.JWTSECRET,{
        expiresIn:"15d",
    })
}

module.exports = new mongoose.model('user',UserSchema);