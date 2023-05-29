const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// we need to hash password before saving into database 
userSchema.pre('save',async function(next){
    if(this.isModified()){ // if password field is modified then only hash the password else don't hash sometime we update the name and not password 
        // console.log(this.password);
        this.password = await bcrypt.hash(this.password,10);
        // console.log(this.password);
        // if we are using confirm password in our schema then we can use 
        // this.confirmPassword = undefined it will make our databasae free from confirm password
    }
    next();

})

const User = mongoose.model('User',userSchema);
module.exports = User;