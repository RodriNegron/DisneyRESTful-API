const {check} = require("express-validator");

module.exports=[
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name must have at least 4 characters').isLength({ min: 4 }),
    check('email', 'Must be a valid email').isEmail(),
    check('password', 'Password can not be empty').notEmpty()
]