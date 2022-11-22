const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const Posts = sequelize.define('comments', {
    comment: { type: Sequelize.TEXT, validate: {
        notEmpty: {
            msg: 'Title is empty'
        }
    }},
    iduser: { type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
            msg: 'Iduser is empty'
        }
    }},
    idpost: { type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
            msg: 'Idpost is empty'
        }
    }}
});

module.exports = Posts;