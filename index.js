const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const teamRoute = require('./routes/teams');
const blockerRoute = require('./routes/blockers');


dotenv.config();

//Connect to DB

mongoose.connect(
    'mongodb://127.0.0.1:27017',
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
app.use('/api/posts', postRoute);
app.use('/api/teams', teamRoute);
app.use('/api/blockers', blockerRoute);


app.listen(3000, () => {
    console.log('Server up and running');
});