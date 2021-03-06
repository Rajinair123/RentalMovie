const mongoose = require("mongoose");
const Joi = require("Joi");
const config = require("config")
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        minlength:5,
        maxlength:50,
        required:true,
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        maxlength:1024,
        minlength:5,
        unique:true,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,

    }
});

userSchema.methods.getAuthToken =function(){
    return jwt.sign({_id: this._id,isAdmin:this.isAdmin},
        config.get("jwtprivatekey")
        );
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required(),
        isAdmin:Joi.boolean(),
    });
    return schema.validate(user)
}
module.exports.User = User;
module.exports.validateUser = validateUser;
