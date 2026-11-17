const express = require('express');
const {registerUser, loginUser, verifyEmail} = require('../controllers/auth.controller');



const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


router.post('/verify-email', verifyEmail);


module.exports = router;
