const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json())



app.post('/notes',async (req,res)=>{
    const {title,desc,age} = req.body
    

    const note = await noteModel.create({
        title,
        desc,
        age
    })
    
    res.status(201).json({
        message: "note created successfully",
        note
    })
    
})


module.exports = app