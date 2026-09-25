const server = require('express')


const app = server()


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/about',(req,res)=>{
    res.send('this is about page')
})



app.listen(3000 ,()=>{
    console.log('server is running on port no:3000');
    
})

