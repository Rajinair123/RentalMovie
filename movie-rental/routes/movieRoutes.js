const express = require('express');
const { Genre } = require('../models/genreModel');
const router = express.Router();
const validobjectid = require("../middleware/validobjectid")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const {Movie,movieSchema, validateMovie} = require("../models/movieModel");
const { append } = require('express/lib/response');


router.get("/",async(req,res)=>{
    const movie = await Movie.find();
    if(movie && movie.length === 0){
        return  res.status(404).send("movies Not found")
    }
    res.send(movie);
})

router.post("/pfs", async (req, res) => {
    const { currentPage, pageSize,genreName,title,sortColumn} = req.body;
    let skip =(currentPage - 1) * pageSize;
     let query = {};
     if(genreName){
         query["genre.name"]= genreName
     }
     if(title){
        query["title"]= new RegExp(`^${title}`,"i");
    }

      let sort = {};
      if(sortColumn){
          const {path,order} = sortColumn;
          sort [path] = order;
      }


// const {path,order}=sortColumn

     const movies = await Movie.find(query).limit(pageSize)
      .skip(skip)
    .sort(sort)
     
//        if(!movies) return res.status(404).send("movie not found");
       res.send(movies)
  });


  router.get("/count", async (req, res) => {
     const  genreName  = req.query.genreName;
      const title = req.query.title;
      
     let query = {};
     if(genreName){
         query["genre.name"]= genreName;
     }
     if(title){
        query["title"]= new RegExp(title,"i");
    }
    const moviesCount = await Movie.find(query).count();
    res.status(200).send({ moviesCount });
  });



router.get("/:id",async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Movies not found");
    res.send(movie);

});

router.post("/",auth,async(req,res)=>{
    try {
        const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);    
    if(!genre) return res.status(400).send("no genre found with given id");
    const movie = new Movie({
        title: req.body.title,
        genre: {
            name : genre.name,
            _id: genre._id,

        },
        dailyRentalRate : req.body.dailyRentalRate,
        numberInStock : req.body.numberInStock,
        liked :req.body.liked,
    });
    await movie.save();
    res.send(movie);
    } catch (error) {
     res.send(error.message);  
    }
});

router.put("/:id",auth,async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("no genre found with given id");
    const movie = await  Movie.findByIdAndUpdate(
        req.params.id,
        {
        $set:{
            title:req.body.title,
            genre:{
                name: genre._id,
            },
            dailyRentalRate: req.body.dailyRentalRate,
            numberInStock: req.body.numberInStock,
            liked: req.body.liked
        },
        
        },
        {new:true}
    );

    if(!movie) return res.status(404).send("Movies not found");
    res.send(movie);

    
})

router.delete("/:id",auth,async(req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send("Movie Not found");
 res.send(movie);

});


module.exports = router;