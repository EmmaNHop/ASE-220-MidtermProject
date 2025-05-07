/**
 * 
 *         This is to handling signing and verifying tokens
 *  
 */

const jwt = require('jsonwebtoken');

// Key from .env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generate a Token
const generateToken = (payload, expiresIn = '5m') => {
    try{
        return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
    } catch(error){
        console.log('Error generating token: \n' + error);
        throw new Error('       Token generation error. ')
    }
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch(error) {
        console.error('Error validating token: \n' + error)
        throw new Error('       Invalid token. ');
    }
}

async function decode(token){
    try{
        const decoded = jwt.decode(token);
        console.log(decoded);
        return decoded;
    } catch(error) {
        console.log('Error decoding token: \n' + error);
        throw new Error('       Server Error. ');
    }
}

module.exports = { generateToken, verifyToken, decode};