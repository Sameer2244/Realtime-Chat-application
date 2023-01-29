const express = require('express');

const mongoose = require('mongoose')
const router = express.Router();

//schema
const ChatModel = require('../models/chatModel');

//chat db controllers

const GetallChat = async (req, res) => {
  const allchats = await ChatModel.find({}).sort({ createdAt: -1 })
  if (!allchats) {
    return res.status(404).json({ message: "no chats found" });
  }

  res.status(200).json(allchats);
}
const GetSingleChat = async (req, res) => {
  const { _chatcode } = req.params
  console.log("code: ", _chatcode)
  const chat = await ChatModel.findOne({ chatcode: _chatcode })
  if (!chat) {
    return res.status(404).json({ message: "no such chat found" });
  }

  res.status(200).json(chat);
}

const Addmessage = async (req, res) => {
  const { _chatcode} = req.params
  console.log("chatcode: ", _chatcode)
  const updatedChat = await ChatModel.findOneAndUpdate({ chatcode: _chatcode }, {
    ...req.body
  })
  if(!updatedChat) {
    return  res.status(404).json({message:"no such user found"});
  }
  res.status(200).json(updatedChat);
}
const createChat= async (req,res)=>{
  const {chatcode,chats} = req.body
  try{
      const newChat =await ChatModel.create({chatcode,chats})
      res.status(200).json(newChat);
  }catch(err){
     res.status(400).json({message:err.message});
  }
}
module.exports = {
  GetallChat,
  GetSingleChat,
  Addmessage,
  createChat
}