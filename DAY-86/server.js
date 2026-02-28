

const express = require("express");

const app = express(); // server instance create karna 


app.get('/',(req , res )=>{
    res.send("hello world")
})

app.get('/about',(req,res)=>{
    res.send("this is a about page")
})

app.get('/home', (req,res)=>{
    res.send("this is a home page")
})

app.listen(3000)