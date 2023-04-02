
// importing the necessary modules
const mongoose = require('mongoose')
const express = require('express')

// setting up the express app
const app = express()

// database url for the mongodb used 
const db = "mongodb+srv://Scaler:Kushb01%40@cluster0.d8jllfk.mongodb.net/?retryWrites=true&w=majority";

// connecting to the database 
mongoose.connect(db).then(() => {
    console.log('CONNECTION SUCCESSFUL');
}).catch((err) => {
    console.log(err);
})

// adding the json middleware to the express app
app.use(express.json())

// importing the api routes
app.use(require('./router/auth'))

// running the app on port 3000 on the localhost
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
