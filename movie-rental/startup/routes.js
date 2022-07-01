const genreRoutes = require('../routes/genreRoutes');
const movieRouter = require("../routes/movieRoutes");
const customerRouter = require("../routes/customerRoutes");
const rentalRouter = require("../routes/rentalRoutes");
const userRouter = require("../routes/userRoutes")
const loginRouter = require('../routes/loginRoutes')
const error = require("../middleware/error")
const express = require('express');
module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres',genreRoutes);
    app.use('/api/customers',customerRouter)
    app.use('/api/movies',movieRouter);
    app.use('/api/rentals',rentalRouter);
    app.use('/api/users',userRouter);
    app.use('/api/login',loginRouter)
    app.use(error)
}