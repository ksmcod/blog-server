const express = require('express');

const app = express();

app.get('/test',(req,res) => {
    res.json({ res:"Everything good!" });
})

app.listen(4000,() => {
    console.log('Listening on port 4000');
})