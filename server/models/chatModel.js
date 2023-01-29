const mongoose = require('mongoose')


const Schemas = mongoose.Schema
const chat = new Schemas({
    message:{
        type:String,
        required:true
    },
    email :{
        type :String,
        required:true
    }
},{timestamps:true})

const createChat = new Schemas({
    chatcode:{
        type:String,
        required:true
    },
    chats :{
        type :[chat],
        required:true
    }
},{timestamps:true})
//table name
module.exports = mongoose.model('Chat', createChat)