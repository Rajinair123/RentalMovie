require('express-async-errors');
const winston = require('winston')
module.exports = function(){
    winston.configure({
        transports:[
            new winston.transports.Console(),
            new winston.transports.File({filename:"logfile.log"}),
        ],
    
    });
    
    
    process.on("uncaughtException", function(ex){
        winston.error ("we got an exception " + ex.message)
        process.exit(1);
    })
    
    process.on("unhandledRejection", function(ex){
        winston.error ("we got an unhandle rejection " + ex.message)
        process.exit(1);
    })
    

    
}