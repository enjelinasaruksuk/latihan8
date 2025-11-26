const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route untuk login
router.post('/', authController.login);

// Route untuk register (opsional)
router.post('/register', authController.register);

module.exports = router;