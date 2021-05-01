const express = require('express');
const filmsController = require('../controllers/filmsController');
const filmValidate = require('../middlewares/filmValidate');
const router = express.Router();

router.get("/", filmsController.list);
router.get("/:id", filmsController.detail);

//create
router.post('/create',filmValidate, filmsController.create);
//update
router.put('/update/:id', filmsController.update);
//delete
router.delete('/delete/:id', filmsController.destroy);

module.exports=router;