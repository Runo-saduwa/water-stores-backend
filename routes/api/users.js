const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const auth = require('../auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.post('/new-address', auth, userController.newAddress)
router.get('/get-addresses/:userId', auth, userController.getSingleAddress);

module.exports = router;
