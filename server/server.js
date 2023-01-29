require('dotenv').config();
const express = require('express');

const chatRoutes = require('./routes/chatrequest')
const userRoutes = require('./routes/requests')
//express app init
const app = express();
const mongoose = require('mongoose');
//middleware
app.use(express.json())


app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})


app.use('/chats', chatRoutes)
app.use('/users',userRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MOGO_URL).then(()=>{

    app.listen(process.env,()=>{
        console.log('listening on port:4000!');
    })
}).catch(err=>{ 
    console.log(err);
})