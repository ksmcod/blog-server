const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter')
require('dotenv').config();

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());


// Router
app.use('/api/user',authRouter);


// app.listen(port,() => {
//     console.log(`Server listening on port ${port}`);
// })

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port,() => {
        console.log(`Connected to db & listening on port ${port}`);
    })
});