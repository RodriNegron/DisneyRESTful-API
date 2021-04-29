const express = require('express');
const filmsController = require('../controllers/filmsController');
const router = express.Router();

router.get("/", filmsController.list);
router.get("/:id", filmsController.detail);

module.exports=router;