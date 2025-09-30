const express = require('express');
const apiroutes = express.Router();

const blogController =  require('../controllers/blogController')
const {verifyToken} = require('../middlwere/verifyToken')

apiroutes.post('/create',verifyToken,blogController.createBlog);
apiroutes.get('/getAll',verifyToken,blogController.getAllBlogs)
apiroutes.get('/:id',verifyToken,blogController.getBlogById)
apiroutes.put('/:id',verifyToken,blogController.updateBlog)
apiroutes.delete('/:id',verifyToken,blogController.deleteBlog)
module.exports = apiroutes;