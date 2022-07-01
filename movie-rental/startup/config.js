const config = require("config");
module.exports=function(){
if(!config.get("jwtprivatekey")){
        console.log("FATA ERROR JWTPRIVATEKEY IS NOT FOUND");
        process.exit(1);
    }
}