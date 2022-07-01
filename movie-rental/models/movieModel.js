const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { genreSchema } = require("./genreModel");



//schema and validation for post movieModel
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required :true,
    minLength : 5,
    maxLength :255,
  },
  genre: {
      type: genreSchema,
      required:true,

  },
  dailyRentalRate : {
      type : Number,
      required:true,
      min: 0,
      max: 255,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  liked :{
    type: Boolean,
    default:true
  }

  });

  const Movie = mongoose.model("Movie", movieSchema);
   function validateMovie(movie){
     const schema = Joi.object({
       title:Joi.string().min(5).max(255).required(),
      dailyRentalRate: Joi.number().min(0).max(255).required(),
      numberInStock: Joi.number().min(0).max(255).required(),
      liked : Joi.boolean(),
      genreId:Joi.objectId().required(),
     
    });
    return schema.validate(movie);
   }
   module.exports.Movie = Movie;
   exports.validateMovie = validateMovie;
