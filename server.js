const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// initialize app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());


// Routes
app.get('/test',(req,res) => {
    res.json({ res:"Everything good!" });
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port,() => {
        console.log(`Connected to db & listening on port ${port}`);
    })
});