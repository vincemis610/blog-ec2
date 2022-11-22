const jwt = require('jsonwebtoken');

const generateToken = payload => {
    const {id, name, email} = payload;
    const accessToken = jwt.sign({ id, name, email }, process.env.SECRET_TOKEN, { expiresIn: 600 });
    const refreshToken = jwt.sign({ id, name, email }, process.env.SECRET_TOKEN, { expiresIn: '24h'})
    return {
        status: 'LoggedIn',
        accessToken,
        refreshToken
    }
};

const verifyToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
        if(err) {
            return res.status(401).json({success: false, err})
        }
        next();
    });
}

module.exports = { generateToken, verifyToken }