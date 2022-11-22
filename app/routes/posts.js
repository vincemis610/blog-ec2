const express = require('express');
const router = express.Router();
const { getPosts, getPost, updatePost, newPost, deletePost } = require('../controllers/posts')
const { verifyToken } = require('../helpers/auth');
const upload = require('../utils/s3');

router.get('/', getPosts)
    .get('/:id', getPost)
    .post('/', verifyToken, upload, newPost)
    .put('/:id', verifyToken, updatePost)
    .delete('/:id', verifyToken, deletePost)

module.exports = router;