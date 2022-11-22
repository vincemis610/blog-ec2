const Comments = require('../models/comment');

const selectComments = async (id) => {
    console.log(id)
    const data = await Comments.findAll({
            where: {idpost: id},
            attributes: ['id', 'comment', 'iduser', 'idpost'],
        });
    if(data.length <= 0) return {msg: 'Any comment has been realized!'}
    return data;
};

const selectComment = async (id) => {
    const comment = await Comments.findOne({
            where: { id },
            attributes: ['id', 'comment', 'iduser', 'idpost'],
        });
    if(comment.length <= 0) return {msg: 'Any comment has been realized!'}
    if(!comment) return 'No post found';
    return comment;
} 

const createComment = async (data) => {
    const post = await Comments.create(data)
    return post;
}

const updateCommentService = async (id, data) => {
    await Comments.update(data,{ where: {id} });
    const updated = await Comments.findOne({
        where: {id},
        attributes: ['comment'],
    });
    if(!updated) return 'No post found';
    return updated;
}

const deleteCommentService = async (id) => {
    const post = await Comments.destroy({ where: {id} });
    if(post > 0) return { msg: 'Deleted successfully!' };
    return { msg: 'No post deleted!!'};
}

module.exports = { selectComments, selectComment, createComment, updateCommentService, deleteCommentService };