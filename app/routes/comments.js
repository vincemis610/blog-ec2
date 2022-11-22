const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helpers/auth');
const { getComments, getComment, addComment, updateComment, deleteComment } = require('../controllers/comments')

router.get('/post/:idpost', getComments)
    .get('/:id', getComment)
    .post('/post/:idpost', verifyToken, addComment)
    .put('/post/:idpost', verifyToken, updateComment)
    .delete('/post/:idpost', verifyToken, deleteComment)

module.exports = router;