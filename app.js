// import express
const express = require('express');

// create app
const app = express();

// import cors
const cors = require('cors');

// import port from .env
const port = process.env.PORT;

// middleware parsing body requests
app.use(express.json())

app.get('/api', (req, res) => {
    res.send('Server Med Warewhouse OK');
} )

app.listen(port, (req, res) => {
    console.log('Med Wareshouse API server is listening')
});