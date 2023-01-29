const mongoose = require('mongoose')


const Schemas = mongoose.Schema


const chats= new Schemas({
    chatcode:{
        type: String,
        required: true,
    }
})

const createUser = new Schemas({
    name:{
        type:String,
        required:true
    },
    age :{
        type :Number,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    chats :[chats],
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
//table name
module.exports = mongoose.model('User', createUser)