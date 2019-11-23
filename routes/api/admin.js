const express = require('express');
const router = express.Router();
const adminControllers = require('../../controllers/adminControllers');


router.get('/', adminControllers.getAdmins);
router.post('/signup', adminControllers.adminSignUp);
router.post('/login', adminControllers.adminLogIn);


module.exports = router;