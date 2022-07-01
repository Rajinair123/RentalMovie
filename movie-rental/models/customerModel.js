const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid");



const customerSchema = new mongoose.Schema({
    name :{
        type :String,
        required : true,
        minlength :5,
        maxlength: 50,
    
    },
    phoneNo :{
        type : String,
        minlength : 9,
        maxlength :10,
    },
    isGold:{
         type :Boolean,
         default : false,
    }
    
})

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phoneNo:Joi.string().min(9).max(10),
        isGold:Joi.boolean(),
        _id:Joi.objectId(),

    });
    return schema.validate(customer)

}
module.exports.Customer = Customer
module.exports.validateCustomer= validateCustomer;
