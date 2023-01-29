const express = require('express');

const mongoose = require('mongoose')
const router =express.Router();

//schema
const UserModel= require('../models/userModel');

const GetallUsers = async (req,res)=>{
    const user= await UserModel.find({}).sort({createdAt:-1})
    if(!user){
      return  res.status(404).json({message:"no users found"});
    }

    res.status(200).json(user);
}

const CreateUser= async (req,res)=>{
    const {name,age,email,password,chats} = req.body
    try{
        const newUser =await UserModel.create({name, age, email,password,chats})
        res.status(200).json(newUser);
    }catch(err){
       res.status(400).json({message:err.message});
    }
}

const FindUser = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"invalid user id"});
    }
    const user= await UserModel.findById(id)
    if(!user){
      return  res.status(404).json({message:"no such user found"});
    }

    res.status(200).json(user);
}
const DeleteUser = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"invalid user id"});
    }
    const user= await UserModel.findOneAndDelete({_id:id})
    if(!user){
      return  res.status(404).json({message:"no such user found"});
    }

    res.status(200).json({message:'user deleted'});
}

const UpdateUser = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"invalid user id"});
    }
    const user= await UserModel.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!user){
      return  res.status(404).json({message:"no such user found"});
    }

    res.status(200).json(user);
}

const FindUserbyEmail = async (req,res)=>{
    const {_email} =req.params
    console.log("email: ",_email)
    const user= await UserModel.findOne({email:_email})
    if(!user){
      return  res.status(404).json({message:"no such email found"});
    }

    res.status(200).json(user);
}


//signin
const FindUserbyEmailandPassword = async (req,res)=>{
    const {_email,_password} =req.params
    console.log(_email)
    const user= await UserModel.findOne({
        $and : [{email:_email},{password:_password}]
})
    if(!user){
      return  res.status(404).json({message:"no such user found"});
    }

    res.status(200).json(user);
}


module.exports = {
    CreateUser,
    FindUser,
    GetallUsers,
    DeleteUser,
    UpdateUser,
    FindUserbyEmailandPassword,
    FindUserbyEmail,
}