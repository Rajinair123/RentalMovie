const express = require("express");
const router = express.Router();
const validobjectid = require("../middleware/validobjectid")
const admin = require("../middleware/admin")
const auth = require("../middleware/auth")
const{Customer, validateCustomer} = require("../models/customerModel");
const Joi = require('joi');

router.get("/", async(req,res)=>{
    const customer =await Customer.find();
    if(customer.length ==0) return res.status(404).send("customer not found");
    res.status(200).send(customer);
})


router.get("/count",async(req,res)=>{
    const customersCount = await Customer.find({}).count()
    res.send({customersCount})
})

router.post("/pfs",async(req,res)=>{
    const {currentPage,pageSize} = req.body
    let skip = (currentPage-1)*pageSize;
    const customers = await Customer.find({}).limit(pageSize)
    .skip(skip)
    res.send(customers)
})




router.get("/:id",async(req,res)=>{
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("customer not found with given id")
    res.send(customer);
})

router.post("/",auth,async(req,res)=>{
const {error} = validateCustomer(req.body);
if(error){ 
    console.log("called"+error.details[0].message);
    return res.status(400).send(error.details[0].message);}
   const customer = new Customer({
        name: req.body.name,
        phoneNo:req.body.phoneNo,
        isGold: req.body.isGold,
    })
    await customer.save()
    res.send(customer)
})

router.put("/:id",auth,async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await  Customer.findByIdAndUpdate(
        req.params.id,
        {$set : {name : req.body.name, 
            phoneNo:req.body.phoneNo ,
             isGold: req.body.isGold}},
    
    {new:true}

);
if(!customer) return res.status(404).send("customers Not found ")
 res.send(customer);

} )


router.delete("/:id",auth,async(req,res)=>{
    const customer = await Customer. findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send("customers Not found")
 res.send(customer);

})



module.exports = router;