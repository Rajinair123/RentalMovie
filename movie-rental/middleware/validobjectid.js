const mongoose = require("mongoose")

module.exports= function(req,res,next){
    const isvalid =mongoose.Types.ObjectId.isValid(req.params.id)
    if(!isvalid) return res.status(400).send("Invalid id")
    next()
}