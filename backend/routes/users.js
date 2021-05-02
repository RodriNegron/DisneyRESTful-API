const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userValidate = require('../middlewares/userValidate');

router.post('/register',userValidate, usersController.register);

module.exports = router;