const mongoose = require('mongoose');
const path = require('path');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        default:''
    }

},{timestamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;