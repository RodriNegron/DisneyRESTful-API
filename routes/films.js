const express = require('express');
const filmsController = require('../controllers/filmsController');
const router = express.Router();

router.get("/", filmsController.list);
router.get("/:id", filmsController.detail);

//create
router.post('/create', filmsController.create);
//update
router.put('/update/:id', filmsController.update);
//delete
router.delete('/delete/:id', filmsController.destroy);

module.exports=router;