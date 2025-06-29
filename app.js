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


// middleware parsing body requests
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // se usi cookie o auth header
}));

// import connectDB
const connectDB = require('./config/db')
// establish connection
connectDB();

app.get('/api', (req, res) => {
    res.send('Server Med Warewhouse OK');
} )

app.use('/api/users', userRouter);
app.use('/api/clinic_rooms', clinicRoomRouter);

app.listen(port, (req, res) => {
    console.log('Med Wareshouse API server is listening')
});