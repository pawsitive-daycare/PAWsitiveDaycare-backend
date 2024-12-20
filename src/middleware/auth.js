const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user');
const { config } = require('dotenv');

config();

const auth = async (req, res, next) => {
    
    SECRET_KEY = process.env.SECRET_KEY;

    try 
        {
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        if (!authHeader) {
            console.log(authHeader);
            console.log('Authorization header missing or invalid');
            return res.status(401).json({error: 'Access denied, please login'});
        }
        const token = authHeader.substring(7);
        console.log('Token:', token);

        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded:', decoded);

        if (!decoded) {
            console.log('Token verification failed');
            return res.status(401).json({error: 'Authentication failed: Invalid token'});
        }
        console.log("Decoded user_id:", decoded.userId);
        const user = await userModel.findById(decoded.userId);
        console.log('User:', user);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({error: 'User not found'});
        }
        console.log('User:', user);
        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(500).json({error: error.message});
    }
};

module.exports = {auth};



