const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {check} = require('express-validator'); 

router.post('/register',[
    check('name', 'name is required').notEmpty(),
    check('name', 'name must have at least 4 characters').isLength({ min: 4 }),
    check('email','must be a valid email').isEmail(),
    check('password','can not be empty').notEmpty()
], usersController.register);
router.post('/login', usersController.login);

module.exports = router;