const express = require('express');
const filmsController = require('../controllers/filmsController');
const router = express.Router();

router.get("/", filmsController.list);

module.exports=router;