


// server create karna 
//server ko config karna



const express = require("express")

const app = express() // server create ho jata hain

module.exports = app


app.use(express.json())
const notes = []

app.get("/",(req,res)=>{
    res.send("hello world")
    
})
//POST /notes => all notes ko bhejna
app.post("/notes",(req,res)=>{
    console.log(req.body);
    
    notes.push(req.body)

    console.log(notes);
    

    res.send('notes created')
})

//GET /notes => all notes ko bhejna

app.get("/notes", (req,res)=>{
    res.send(notes)
})

//DELETE /notes/0 => NOTES ko delete karna 

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.send("note deleted successfully")

    console.log(req.params);
    
})

//PATCH /notes/:index

app.patch("/notes/:index",(req,res)=>{
    notes [req.params.index].description = req.body.description

    res.send('note update successfully  ')
})