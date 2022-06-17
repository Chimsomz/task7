const express = require('express');
const authRoutes = require('./routes/authRoutes')
const app = express ();

// middlewares
app.use(express.json());
app.use('/', authRoutes )

// import mongoose
const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/locations';

// connect to mongoose
mongoose.connect(url,function (err) {
  if (err) { console.log(err); }

  console.log('Connected to mongoDB successfully');
});


//const axios = require("axios");
//location

/*const summonAxios = () => {
   axios
    .request(options)
   .then(function (response) {
      console.log(response.data.country);
    })
    .catch(function (error) {
       console.error(error);
     });
 };
 summonAxios();*/

let port = 3000
app.listen(port,() => {
    console.log('Server is running on port 3000');
});