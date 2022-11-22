const express = require('express');
const router = express.Router();
const fs = require('fs');
const { registerUser, loginUser } = require('../controllers/users')

const routerPath = `${__dirname}`;

fs.readdirSync(routerPath).filter(fileName => {
    const removeExtension = fileName.split('.').shift();
    if(removeExtension !== 'index'){
        router.use(`/${removeExtension}`, require(`./${removeExtension}`))
    }
});

router.get('/', (req, res) => {
    res.status(404);
    res.json({ msg: 'Not Found' });
})
.post('/register', registerUser)
.post('/login', loginUser)

module.exports = router;