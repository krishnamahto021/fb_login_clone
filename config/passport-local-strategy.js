const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



// serializing user todecide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing user form the key in the cookies
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding uesr --> passport',err);
        return done(err);
    }
});

// authentication using passport
passport.use(new LocalStrategy(
    {
    usernameField:'email',
    },
    async function(email,password,done){
        // find a user and establish it identity
        try{
        const user = await User.findOne({email:email});
        if(!user){
            console.log('Invalid User');
            return done(null,false,{message:'invalid user'});
        }else if(user.password != password){
            console.log('Invalid Password!!');
            return done(null,false,{message:'invalid password'});
        }
        console.log('authenicated user!!')
        return done(null,user);
        }catch(err){
            console.log(`error in creating session using passport ${err}`);
            // return done(err);
        }
        

    }
));


// chck if user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){ // if the user is signed in pass to next function in user's controller
        return next();
    }
    // if user is not signed in
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the currently signed in user and we are just sending it to the locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;