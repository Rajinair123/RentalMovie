const express = require('express');
const router = express.Router();
const admin= require("../middleware/admin")
const validobjectid = require("../middleware/validobjectid")
const auth = require("../middleware/auth")
const {Genre,validateGenre} = require("../models/genreModel")
 const Joi = require('joi');


router.get("/",async(req,res)=>{
    const genre = await Genre.find({})
    if(genre && genre.length === 0){
        
        return  res.status(404).send("Genres Not found")
    }
    res.status(200).send(genre);
    
    res.send(genre);
});


router.get("/count", async(req,res)=>{
    let query = {};
    const genresCount = await Genre.find(query).count();
    res.status(200).send({genresCount})

})

router.post("/pfs",async(req,res)=>{
    const {currentPage, pageSize}=req.body
    let skip =(currentPage-1)*pageSize;
    let query = {};
const genres = await Genre.find(query).limit(pageSize)
.skip(skip)
res.send(genres)



})





router.get("/:id",auth,async(req,res)=>{
   const genre = await Genre.findById(req.params.id);
   if(!genre) return res.status(404).send("Genres Not found with given id")
    res.status(200).send(genre);
})



router.post("/",auth, async(req,res)=>{
   const { error }= validateGenre(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const genre = new Genre({
       name :req.body.name,
   });
   await genre.save();
   res.send(genre);

});
     

router.put("/:id",auth,async(req,res)=>{
    const { error }= validateGenre(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {$set : {name : req.body.name}},
    {new:true}

);
if(!genre) return res.status(404).send("Genres Not found")
 res.send(genre);

});




router.delete("/:id",auth,async(req,res)=>{
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send("Genres Not found");
 res.send(genre);

});

module.exports = router;
