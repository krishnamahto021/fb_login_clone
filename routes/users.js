const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-up' }), usersController.createSession);
router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/forgotten-password',usersController.forgottenPasswordForm);
router.post('/forgotten-password',usersController.forgottenPassword);
router.get('/update-password/:id',usersController.updatePasswordForm);
router.post('/update-password',usersController.updatePassword);

//  route for sign up or sign in the user via google
router.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),usersController.createSession);


router.get('/sign-out',usersController.destroySession);


module.exports = router;