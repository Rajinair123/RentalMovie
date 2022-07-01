const express = require('express')
const router =  express.Router()
const Joi = require('joi')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const {User} = require("../models/userModel")


router.post("/",async(req,res)=>{
 
    const { error } = validate(req.body);
    if(error) return res.status(400).send(`from joi ${error.details[0].message}`);

    let user = await User.findOne({email: req.body.email });
    if(!user)return res.status(400).send("Invalid username and password")

    const isValid = await bcrypt.compare(req.body.password,user.password)
    if(!isValid)return res.status(400).send("Invalid username and password")

    const token = user.getAuthToken()
    res.send(token);
  
  });
  
 function validate(input){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email(),
        password:Joi.string().min(5).max(255),
      
    });
    return schema.validate(input)
 }
 module.exports = router;