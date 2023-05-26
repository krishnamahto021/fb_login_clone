const express = require('express');
const app = express();
const port = 8000;

// to use static folder in our project
app.use(express.static('./assets'));

// to set view engine
app.set('view engine','ejs');
app.set('views','./views');

// to set routes
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        // console.log('error in running Server ',err);
        console.log(`error in running Server ${err}`);// by interpolation
    }
    console.log(`Server is running on port : ${port}`);
})