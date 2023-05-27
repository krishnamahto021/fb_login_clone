const User = require('../models/user')
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'Sign Up'
    })
};

// to fetch up the data from the signup form
module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            console.log('Password and Confirm password are different!');
            return res.redirect(back);
        }
        const user = await User.findOne({email:req.body.email});

        if(!user){// user doesnot exist
                const newUser = await User.create(req.body);
                return res.redirect('/');
        }else{
            console.log('User already registered!!');
            return res.redirect('/');
        }

    }catch(err){
        console.log(`errror in creating session for user ${err}`);
    }
}

// to create session 
module.exports.createSession = function(req,res){
    // console.log(req.authInfo.message);
    console.log('inside createsession');
    return res.redirect('/users/profile');
}

// to destory session
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        console.log('something went wrong!!',err);
    });
    console.log('Logged out successfully!!!');
    return res.redirect('/');
}

// to show profile
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'User'
    })
}