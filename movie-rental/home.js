const express = require('express');
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("welcome to genres");
});
module.exports = router;
