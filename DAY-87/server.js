const express = require('express');


const app = express()

app.use(express.json()) 


// app.get("/",(req,res)=>{
//     res.send("this is homepage")
// })

// app.get('/about',(req,res)=>{
//     res.send('this is about page')
// })


const notes = []

app.post('/notes',(req,res)=>{

    console.log(req.body);
    notes.push(req.body)
    
    res.send("notes created")
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})