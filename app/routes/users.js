const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')
const { verifyToken } = require('../helpers/auth')

router.get('/', verifyToken, getUsers)
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

module.exports = router;