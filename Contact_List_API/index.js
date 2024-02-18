//reference
const express = require('express');
const mongoose = require('mongoose');
//dbConfig = require('./db/database');
cors = require('cors');

// set up our express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/ProjectDatabase');
mongoose.Promise = global.Promise;

//using json middleware
app.use(express.json());

//use cors middleware
app.use(cors());

// initialize routes
app.use('/api', require('./routes/api'));


// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});


// Enabing request headers for cross origin - CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Access-Control-*")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    next();
});

const port = 6500
app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://localhost:${port}/api`)
})