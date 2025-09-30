const express = require('express');
const apiroutes = express.Router();

const authController =  require('../controllers/authController')
const {verifyToken} = require('../middlwere/verifyToken')

apiroutes.post('/register',authController.register);
apiroutes.post('/login',authController.login);
apiroutes.post('/logout',authController.logout)
apiroutes.get('/getOne',verifyToken,authController.getOne)
module.exports = apiroutes;