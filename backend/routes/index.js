const express = require('express');
const apiroutes = express.Router();

const auth =  require('./authRoutes');
const blog = require('./blogRoutes');
apiroutes.use('/auth',auth);
apiroutes.use('/blog',blog);

module.exports = apiroutes;