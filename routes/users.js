const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-up' }), usersController.createSession);


router.get('/sign-out',usersController.destroySession);
router.get('/profile',passport.checkAuthentication,usersController.profile);

module.exports = router;