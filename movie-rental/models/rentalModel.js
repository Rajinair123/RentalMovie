const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const rentalSchema = new mongoose.Schema({
    customer:new mongoose.Schema({
    name:{
    type:String,
    required:true,
    minLength:5,
    maxLength:50
    },
    phoneNo:{
    type:String,
    required:true,
    minLength:9,
    maxLength:10
    }
    }),
    movie: {
        required: true,
        type: new mongoose.Schema({
          title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
          },
          dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
          },
        }),
      },
      dateOut: {
        type: Date,
        default: Date.now,
      },
      dateIn:{ 
        type: Date,
        default: null
      },
      rentalFee: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
    })

const Rental = new mongoose.model("Rental", rentalSchema);
function validateRental(rental){
    const schema = Joi.object({
        customerId : Joi.objectId().required(),
        movieId :Joi.objectId().required(),
    
    })
   return schema.validate(rental)
}

module.exports.Rental = Rental;
exports.validateRental=validateRental;
