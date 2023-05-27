const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();


router.get('/',homeController.home);
router.use('/users',require('./users'));

router.get('/session-data', (req, res) => {
    res.send(req.session);
  });
  


module.exports = router;