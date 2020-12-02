const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!')
);


//Middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/user', authRoute);


app.listen(3100, () => {
    console.log('Server up and running');
});