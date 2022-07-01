const mongoose = require("mongoose")
const Joi = require ("joi");
Joi.objectid = require("joi-objectid")
const genreSchema = new mongoose.Schema({
    name : {
        type :String,
        required:true,
        minlength:3,
        maxlength:10,
        
        
    }

})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = Joi.object({
        name:Joi.string().min(3).max(10).required(),
        _id:Joi.objectId(),
    });
    return schema.validate(genre)
}
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
module.exports.genreSchema = genreSchema;
