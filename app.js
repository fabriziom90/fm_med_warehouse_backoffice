// import express
const express = require('express');

// create app
const app = express();

// import cors
const cors = require('cors');

// import port from .env
const port = process.env.PORT;

const userRouter = require('./routes/userRoutes');


// middleware parsing body requests
app.use(express.json())


// import connectDB
const connectDB = require('./config/db')
// establish connection
connectDB();

app.get('/api', (req, res) => {
    res.send('Server Med Warewhouse OK');
} )

app.use('/api/users', userRouter);

app.listen(port, (req, res) => {
    console.log('Med Wareshouse API server is listening')
});