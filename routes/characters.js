const express = require('express');
const charactersController = require('../controllers/charactersController');
const router = express.Router();

router.get('/', charactersController.list);
router.get('/:id', charactersController.detail);

router.post('/create', charactersController.create);

module.exports = router;