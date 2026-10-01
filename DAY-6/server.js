const app = require('./src/app')



const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://sahilshaikh49163_db_user:3IndjvHffyRJ33mv@cluster0.isjouxm.mongodb.net/")

.then(()=>{
    console.log('Connected to Database');
    
})
}

connectToDb()


app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})