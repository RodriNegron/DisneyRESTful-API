const express = require('express');
const filmsController = require('../controllers/filmsController');
const {check} = require('express-validator'); 
const router = express.Router();

router.get("/", filmsController.list);
router.get("/:id", filmsController.detail);

//create
router.post('/create',[
    check('title', 'title is required').notEmpty(),
    check('title', 'title must have at least 4 characters').isLength({ min: 4 }),
    check('release_date','release_date can not be empty').notEmpty(),
    check('rating','can not be empty').notEmpty()
], filmsController.create);
//update
router.put('/update/:id', filmsController.update);
//delete
router.delete('/delete/:id', filmsController.destroy);

module.exports=router;