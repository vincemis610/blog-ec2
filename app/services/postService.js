const Users = require('../models/user');
const Posts = require('../models/post');
const Comments = require('../models/comment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// make a join table
Posts.belongsTo(Users, { foreignKey: 'iduser' });
Users.hasMany(Posts, { foreignKey: 'iduser' });
Comments.belongsTo(Posts, { foreignKey: 'idpost' });
Posts.hasMany(Comments, { foreignKey: 'idpost' });

const selectPosts = async (search) => {
    let searching = (search === undefined) ? '' : search;
    const data = await Posts.findAll({
            where: {
                content: {
                    [Op.like]: `%${searching}%`
                }
            },
            attributes: ['id', 'title', 'content', 'url'],
            include: [{
                model: Users,
                required: true,
                attributes: ['id', 'name', 'email']
            },{
                model: Comments,
                required: false,
                attributes: ['comment', 'id']
            }]
        });
    if(data.length <= 0) return {msg: 'Any post has been realized!'}
    return data;
};

const selectPost = async (id) => {
    const post = await Posts.findOne({
            where: {id},
            attributes: ['id', 'title', 'content', 'url'],
            include: [{
                model: Users,
                required: true,
                attributes: ['id', 'name', 'email']
            },{
                model: Comments,
                required: false,
                attributes: ['comment']
            }]
        });
    if(!post) return 'No post found';
    return post;
} 

const createPost = async (data) => {
    const post = await Posts.create(data)
    return post;
}

const updatePostService = async (id, data) => {
    await Posts.update(data,{ where: {id} });
    const updated = await Posts.findOne({
        where: {id},
        attributes: ['id', 'title', 'content', 'url'],
        include: [{
            model: Users,
            required: true,
            attributes: ['id', 'name', 'email']
        }]
    });
    if(!updated) return 'No post found';
    return updated;
}

const deletePostService = async (id) => {
    const post = await Posts.destroy({ where: {id} });
    if(post > 0) return { msg: 'Deleted successfully!' };
    return { msg: 'No post deleted!!'};
}

module.exports = { selectPosts, selectPost, createPost, updatePostService, deletePostService };