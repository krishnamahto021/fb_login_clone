const User = require('../models/user');
const path = require('path');
const fs = require('fs');
const userSignUpMailer = require('../mailers/sign_up_mailer');
const forgottenPasswordMailer = require('../mailers/forgotten_password_mailer');
const crypto = require('crypto');


module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up'
    })
};

// to fetch up the data from the signup form
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log('Password and Confirm password are different!');
            return res.redirect(back);
        }
        const user = await User.findOne({ email: req.body.email });

        if (!user) {// user doesnot exist
            const newUser = await User.create(req.body);
            userSignUpMailer.signUp(newUser);
            req.flash('success','Created Account Successfully!');
            return res.redirect('/');
        } else {
            req.flash('error','User Already Exists!');
            return res.redirect('/');
        }

    } catch (err) {
        console.log(`errror in creating session for user ${err}`);
    }
}

// to create session 
module.exports.createSession = function (req, res) {
    req.flash('success','logged in successfully!');
    return res.redirect('/users/profile');
}



// to show profile
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User'
    })
}

// to show forget pswd email form
module.exports.forgottenPasswordForm = function (req, res) {
    return res.render('forgotten_password_email_form', {
        title: 'Reset Password!'
    })
}

// to fetch data from forget pswd email form
module.exports.forgottenPassword = async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {// if user with that email exists send reset password link via gmail 
        user.token = crypto.randomBytes(20).toString('hex');
        user.save();
        // console.log(user.email);
        forgottenPasswordMailer.forgottenPassword(user.token, user);
        req.flash('success','Reset Email sent!!');
        return res.redirect('/');
    } else {
        console.log('User not Registered!!');
        return res.redirect('/');
    }
}

// to show update password form
module.exports.updatePasswordForm = async function (req, res) {
    try {
        const user = await User.findOne({ token: req.params.id });
        if (user) {// if token is with the user then only show the page

            return res.render('update_password_form', {
                title: 'Update Password',
                user_id:user._id,
            });
        }
    } catch (err) {
        console.log('error in rendering update password form!!', err);
        return res.redirect('/');
    }

}

// to finally update password
module.exports.updatePassword = async function (req, res) {
    const user = await User.findById(req.body.user_id);
    if (user) {
        user.password = req.body.password;
        // console.log(user.password);
        user.save();
        req.flash('success','Updated Password Successfully!')
        return res.redirect('/');
    } else {
        // console.log('unauthorized user!!');
        req.flash('error','Unauthorized Error!');
        return res.redirect('/');
    }
}

// to destroy session
// to signout
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
      req.flash('error','Something Went Wrong!!');
        }
   req.flash('success','Logged out successfully!!');
    return res.redirect('/');
    });
  }