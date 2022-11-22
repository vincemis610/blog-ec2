 const { handleError } = require('../helpers/handleError');
const { selectComments, selectComment, createComment, updateCommentService, deleteCommentService } = require('../services/commentService');

const jwt = require('jsonwebtoken'); 

const addComment = async (req, res) => {
    try {
        const { id: iduser } = jwt.decode(req.get('token'))
        const { idpost } = req.params;
        const { comment } = req.body;
        if(!comment) return res.json({ msg: "Please type comment!"})
        const data = { iduser, idpost, comment }
        console.log(data)
        const response = await createComment(data);
        return res.status(200).json(response);
    } catch (err) {
        handleError(res, err.original.code);
    }
}

const getComments = async (req, res) => {
    try {
        const { idpost:id } = req.params;
        const posts = await selectComments(id);
        return res.json(posts)
    } catch (err) {
        handleError(res, err);
    }
}

const getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await selectComment(id);
        return res.json({comment})
    } catch (err) {
        handleError(res, err);
    }
}

const updateComment = async (req, res) => {
    try {
        const { idpost } = req.params;
        const comment = req.body;
        const updated = await updateCommentService(idpost, comment)
        return res.json({updated})
    } catch (err) {
       handleError(res, err); 
    }
}

const deleteComment = async (req, res) => {
    try {
        const { idpost } = req.params;
        const post = await deleteCommentService(idpost)
        return res.json(post)
    } catch (err) {
       handleError(res, err); 
    }
}

module.exports = { addComment, getComments, getComment, updateComment, deleteComment  }
