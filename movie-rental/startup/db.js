const mongoose = require('mongoose')
const config = require('config');

module.exports = function(){
mongoose
.connect(config.get("db"))
.then(()=>console.log(`connected to test db ${config.get("db")}`))

}