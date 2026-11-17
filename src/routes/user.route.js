const express = require('express')

const auth = require('../middleware/auth.middleware')
const {getProfile, getAllUsers} = require('../controllers/user.controller')
const adminOnly = require('../middleware/admin.middle')

const router  = express.Router()
router.get('/profile', auth, getProfile, adminOnly)
router.get('/admin', auth, adminOnly, getAllUsers)
module.exports = router