
const JWT = require('../utils/jwt.js');

async function authenticateUser(token){
    try{
        const splitToken = token.split(' ')[1];

        const data = JWT.verifyToken(splitToken);

        //console.log('iat: ' + data.iat + ' exp: ' + data.exp)

        if(data){
            return data;
        }
        // Not authenticated
        return false;

    } catch(error){
        console.error('Error handling authentication token: \n' + error);
        throw new Error('       Issue handling token. ');
    }
}

async function generateNewToken(headerData){
    try{

        const newToken = JWT.generateToken(headerData);

        console.log(newToken);
    } catch(error) {
        console.log('Error generating new token: \n' + error);
        throw new Error('       Issue generating new token! ');
    }
    
}

module.exports = {
    authenticateUser,
    generateNewToken
}