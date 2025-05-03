/**
 * 
 *         This is to handling signing and verifying tokens
 *  
 */

const jwt = require('jsonwebtoken');

// Key from .env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generate a Token
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch(error) {
        console.error('Error validating token: \n' + error)
        throw new Error('Invalid token\n');
    }
}

module.exports = { generateToken, verifyToken};