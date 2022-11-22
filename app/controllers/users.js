const { handleError } = require('../helpers/handleError');
const { registerUserService, loginUserService } = require('../services/userSerservice');

const getUsers = async(req, res) => {
    try {
        let response = 'users'
        if(response.length <= 0 ){
            return res.json({msg: 'No data found'})
        }
        return res.json(response);
    } catch(e) {
        return handleError(res, e);
    }
}

const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        //const comment = await Comments.findById(id)
        return res.json(id);
    } catch (e) {
        return handleError(res, e);
    }
}

const registerUser = async (req, res) => {
    try {   
        const data = req.body;
        const response = await registerUserService(data);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        const { errors: [{message}]} = e
        return handleError(res, message);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(401).json({msg: 'Email and password are required!'})
    try {
        const response = await loginUserService(req.body)
        return res.status(200).json(response);
    } catch (e) {
        return handleError(res, e);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = req.body;
        const commentUpdated = id;
        return res.json(commentUpdated);
    } catch (e) {
        return handleError(res, e);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const commentDeleted = id;
        return res.json(commentDeleted);
    } catch (e) {
        return handleError(res, e);
    }
}

module.exports = { getUser, getUsers, updateUser, deleteUser, registerUser, loginUser }