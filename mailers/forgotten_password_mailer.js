const nodemailer = require('../config/nodemailer');

module.exports.forgottenPassword = function(token,user){
    let htmlString = nodemailer.renderTempelate({token:token},'/password/forgotten_password_mailer.ejs');
    console.log(user);

    nodemailer.transporter.sendMail({
        from:'krishna.coding.ninjas01@gmail.com',
        to:user.email,
        subject:'Reset Your password',
        html:htmlString
    },function(err,info){
        if(err){
            console.log(`error in sending mail ${err}`);
        }else{
        // console.log(`message sent ${info}`);
        }
    })
}