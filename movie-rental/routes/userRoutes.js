const express = require('express')
const router =  express.Router()
const _ = require("lodash")
const auth = require("../middleware/auth")
const validobjectid = require("../middleware/validobjectid")
const admin = require("../middleware/admin")
const bcrypt = require('bcrypt')
const {User,validateUser} = require("../models/userModel")

 


router.get("/",async(req,res)=>{
    const users = await User.find();
    if(!users) return res.status(404).send("users Not found")
    res.send(users);
});

router.get("/:id",validobjectid ,async(req,res)=>{
    
        const id=req.params.id;
        const users = await User.findById({_id:id});
        if(!users)return res.status(404).send("users not found with given id")
        res.send(users)
    
    

    })
router.post("/",async(req,res)=>{
    const { error }= validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email });
    if(user)return res.status(404).send("Invalid username and passsword")
   
  user = new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      isAdmin:req.body.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password,salt);
await user.save();
res.send(_.pick(user,["_id","name","email","isAdmin"]));
 
 });



 router.put("/:id", validobjectid,auth, async (req, res) => {
    const { error }= validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                isAdmin: req.body.isAdmin
            }
        }, {new: true});
        if(!user) return res.status(404).send("users Not found")
        res.send(user);
       
    
});



 router.delete("/:id",auth,admin,validobjectid,async(req,res)=>{
    const user = await user.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).send("users Not found");
     res.send(user);

});

 module.exports = router