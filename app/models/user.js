const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const User = sequelize.define('users', {
    name: { type: Sequelize.STRING(100), validate: {
        notEmpty: {
            msg: 'Name is empty'
        }
    }},
    email: { type: Sequelize.STRING(100), 
        unique: true,
        validate: {
            isEmail: {
                msg: 'Invalid email'
            }
     }},
    password: { type: Sequelize.STRING(250),
        validate: {
            notEmpty: {
            msg: 'Password is empty'
        }
        }}
});

module.exports = User;