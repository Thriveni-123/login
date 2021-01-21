const express = require('express');
const router = express.Router();
const LoginController = require('../controller/LoginController');

module.exports = router;
router.post('/socialaccountlogin',
LoginController.Login
);