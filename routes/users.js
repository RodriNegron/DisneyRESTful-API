const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const userValidate = require('../middlewares/userValidate');

router.post('/register',userValidate, usersController.register);
router.post('/login', usersController.login);

module.exports = router;