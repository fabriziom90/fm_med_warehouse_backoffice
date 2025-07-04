// import express
const express = require('express');

// create app
const app = express();

// import cors
const cors = require('cors');

// import port from .env
const port = process.env.PORT;

const userRouter = require('./routes/userRoutes');
const clinicRoomRouter = require('./routes/clinicRoomRoutes');
const productRouter = require('./routes/productRoutes');
const drugRouter = require('./routes/drugRoutes');

// middleware parsing body requests
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // in case you are using cookie or auth header
}));

// import connectDB
const connectDB = require('./config/db')
// establish connection
connectDB();

app.get('/api', (req, res) => {
    res.send('Server Med Warewhouse OK');
} )

// use routes
app.use('/api/users', userRouter);
app.use('/api/clinic_rooms', clinicRoomRouter);
app.use('/api/products', productRouter);
app.use('/api/drugs', drugRouter);

// listening
app.listen(port, (req, res) => {
    console.log('Med Wareshouse API server is listening')
});