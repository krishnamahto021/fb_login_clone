const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy for google login

passport.use(new googleStrategy({
    clientID: '153436722965-5fkhp8fjv3luuvfdl73ijghjr3pt8lum.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://127.0.0.1:8000/users/auth/google/callback',
    },
    async function(accessToken,refreshToken,profile,done){
        try{
        const user = await User.findOne({email:profile.emails[0].value}).exec();
        if(user){ // if user is already there sign in the user
            return done(null,user);
        }else{
            const newUser = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            })
            return done(null,newUser);
        }

        }catch(err){
            console.log('error in google authentication',err);
            return;
        }

    }


))