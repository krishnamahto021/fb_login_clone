const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// set up the express session and passport
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');




// to set cookie parser
app.use(express.urlencoded());


// to use static folder in our project
app.use(express.static('./assets'));

// to set view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(cookieParser());

// setup the mongo store using mongo store
app.use(session({
    name: 'facebook_clone',
    secret: 'somethingblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 80 * 60)
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1/facebook_db'
    },
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function (err) {
            console.log(err || 'successfully added mongostore');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// to set routes
app.use('/', require('./routes'));



app.listen(port, function (err) {
    if (err) {
        // console.log('error in running Server ',err);
        console.log(`error in running Server ${err}`);// by interpolation
    }
    console.log(`Server is running on port : ${port}`);
})