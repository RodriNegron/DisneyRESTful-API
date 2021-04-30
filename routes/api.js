const express = require('express');
const router = express.Router();
const characters = require('./characters');
const users = require('./users');
const films = require('./films');
const auth = require('./auth');
const jwt = require('../middlewares/jwtMiddleware');

router.use('/characters', jwt ,characters);
router.use('/users', users);
router.use('/films', jwt ,films);
router.use('/auth', auth);

module.exports = router;