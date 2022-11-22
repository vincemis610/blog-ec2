const { handleError } = require('../helpers/handleError');
const { selectPosts, selectPost, createPost, updatePostService, deletePostService } = require('../services/postService');

const jwt = require('jsonwebtoken'); 

const newPost = async (req, res) => {
    try {
        const { id: iduser } = jwt.decode(req.get('token'))
        if(req.fileValidation) res.status('401').json({ msg: req.fileValidation });
        const url = req.file.location;
        const { title, content } = req.body;
        const data = { title, content, url, iduser }
        const post = await createPost(data)
        return res.status(200).json(post);
    } catch (err) {
        handleError(res, err);
    }
}

const getPosts = async (req, res) => {
    try {
        const { search } = req.query;
        const posts = await selectPosts(search);
        return res.json(posts)
    } catch (err) {
        console.log(err)
        handleError(res, err);
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await selectPost(id);
        return res.json({post})
    } catch (err) {
        handleError(res, err);
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await updatePostService(id, data)
        return res.json({updated})
    } catch (err) {
       handleError(res, err); 
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await deletePostService(id)
        return res.json(post)
    } catch (err) {
       handleError(res, err); 
    }
}

module.exports = { getPosts, getPost, updatePost, newPost, deletePost  }
