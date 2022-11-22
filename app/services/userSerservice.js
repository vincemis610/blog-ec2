const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/auth');

const registerUserService = async (data) => {
    if(!data.name || !data.email || !data.password){return {msg: 'Some parameters are missing!'}}
    data.password = bcrypt.hashSync(data.password, 10) 
    const user = await User.create(data)
    const response = await generateToken(user);
    return response;
}
const loginUserService = async (data) => {
    const { email, password } = data;
    if(!email || !password) return {msg: 'Email and password are required!'};
    const user = await User.findOne({ where: { email }});
    if(!user) return res.status(401).json({msg: 'User or password incorrect!'});
    const {dataValues} = user;
    const validatePassword = await bcrypt.compare(password, dataValues.password);
    if(!validatePassword) return res.status(401).json({msg: 'User or password incorrect!'});
    return await generateToken(dataValues);
}

module.exports = { registerUserService, loginUserService }