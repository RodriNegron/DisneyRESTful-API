const {check} = require("express-validator");

module.exports=[
    check('title', 'Title is required').notEmpty(),
    check('title', 'Title must have at least 4 characters').isLength({ min: 4 }),
    check('release_date', 'Release_date can not be empty').notEmpty(),
    check('release_date', 'Must be a valid date').isDate(),
    check('rating', 'Can not be empty').notEmpty(),
    check('rating', 'Rating must be a number between 0 and 5').isFloat({max:5})
]