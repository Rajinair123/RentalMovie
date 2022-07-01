const config = require("config");
const jwt = require ('jsonwebtoken')


module.exports = function(req,res,next){
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("access denied");

    try {

        const decoded = jwt.verify(token, config.get("jwtprivatekey"));
        req.user = decoded;
        next()
        
    } catch (error) {
        return res.status(400).send("Invalid token")
    }
}