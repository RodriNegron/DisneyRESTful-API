const express = require('express');
const charactersController = require('../controllers/charactersController');
const router = express.Router();

router.get('/', charactersController.list);
router.get('/:id', charactersController.detail);

    //create
router.post('/create', charactersController.create);
    //update
router.put('/update/:id', charactersController.update);
    //delete
router.delete('/delete/:id', charactersController.destroy);

module.exports = router;