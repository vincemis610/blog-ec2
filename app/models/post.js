const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const Posts = sequelize.define('posts', {
    title: { type: Sequelize.STRING(200), validate: {
        notEmpty: {
            msg: 'Title is empty'
        }
    }},
    content: { type: Sequelize.TEXT, 
        validate: {
            notEmpty: {
            msg: 'Title is empty'
        }
     }},
    url: { type: Sequelize.STRING(200),
        validate: {
            notEmpty: {
            msg: 'Image is empty'
        }
    }},
    iduser: { type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
            msg: 'Iduser is empty'
        }
    }}
});

module.exports = Posts;