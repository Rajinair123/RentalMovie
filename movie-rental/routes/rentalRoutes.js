const express = require('express');
const {Movie} = require("../models/movieModel");
const {Customer} = require("../models/customerModel")
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validobjectid = require("../middleware/validobjectid")
const {Rental,validateRental} = require("../models/rentalModel");
const { find } = require('lodash');


router.get("/",async(req,res)=>{
    const rental = await Rental.find();
    if(!rental) return res.status(404).send(" customer not found");
    res.send(rental);
})

router.get("/count",async(req,res)=>{
        
    const rentalsCount = await Rental.find().count()
    res.send({rentalsCount})
})


 router.post("/pfs",async(req,res)=>{
   const {currentPage,pageSize}= req.body
   let skip = (currentPage-1)*pageSize
   const rentals = await Rental.find().limit(pageSize).skip(skip)
   res.send(rentals)

 })




router.get("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const rental = await Rental.findById({_id:id});
        if(!rental)return res.status(400).send(" customer not found")
        res.send(rental)
    }
    catch(e){
        res.status(400).send(e)

    }

    })



router.post("/",async (req,res)=>{
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);   
    if(!customer) return res.status(400).send("no found with given id");
    const movie = await Movie.findById(req.body.movieId);    
    if(!movie) return res.status(400).send("no found with given id");
    if(movie.numberInStock == 0)
    return res.status(400).send("movie out of stock");
    
    
    const rental = new Rental({
        customer:{
            name : customer.name,
            phoneNo : customer.phoneNo,
            _id: customer._id
        },
        movie:{
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate,
            _id : movie._id
        },
        rentalFee : movie.dailyRentalRate*10

    });
    const session = await Rental.startSession();
    session.startTransaction();
    try{
        await rental.save();
        await Movie.findByIdAndUpdate(movie._id,{$inc: { numberInStock: -1} });
        session.commitTransaction();
        session.endSession();
        res.send(rental);
    
    }catch(error){
        session.abortTransaction();
        session.endSession();
        console.log(error)
        return res.status(500).send("something failed");
    }
   

});



router.patch("/:id" ,async(req,res)=>{
    const session = await Rental.startSession();
    session.startTransaction();
    try{
        const rental = await Rental.findByIdAndUpdate(
            {_id:req.params.id},
            {
                $set:
                { 
                    dateIn: req.body.dateIn,
                },

            },
            {new: true}
        
        );
  
       await Movie.findByIdAndUpdate(rental.movie._id,{
            $inc: {numberInStock :1},
        });
        session.commitTransaction();
        session.endSession();
        res.send(rental);
    
    }catch(error){
        session.abortTransaction();
        session.endSession();
        console.log(error.message);
        return res.status(500).send("something failed");
    }
   

});

router.delete("/:id" ,async(req,res)=>{
    const session = await Rental.startSession()
    session.startTransaction();
    try{
     const rental = await Rental.findByIdAndDelete(req.params.id);
     if(!rental) return res.status(404).send("no found with given id");
     
     await Movie.findByIdAndUpdate(
           rental.movie._id,
         {
             $inc:{numberInStock: 1},

         },
        
     );
     session.commitTransaction();
     session.endSession();
     res.send(rental);


    }catch(e){
        session.abortTransaction();
        session.endSession();
        console.log(error.message);
        return res.status(500).send("something failed");
    }

})

module.exports=router