/**
 * 
 *          Handler for data coming from '../routes/users.js' All CRUD operations for users are done here
 *          Also verifies the user data using '../utils/jwt.js' to create and verify tokens
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/user_db_functions.js');

const JWT = require('../utils/jwt.js');

// Used to hash
const bcrypt = require('bcrypt');

async function getUsersById(id){
    try{
        const data = await db.getUsersById(id);
        return data;
    }catch(error){
        console.error('Error handling getting user by ID: \n    ' + error);
        throw new Error('       Error handling users. ');
    }
}

async function getUsers(){
    try{
        const data = await db.getUsers();
    }catch(error){
        console.error('Error handling getting users: \n' + error);
        throw new Error('       Error handling users. ');
    }
}

async function hashPassword(userPassword){

    try{
        // The higher the num, the more secure
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        return hashedPassword;
    } catch(error){
        console.error('Error hashing password: \n' + error);
        throw new Error('       Issue hashing password. ');
    }
}

async function verifyUser(user){
    try{
        const checkUser = await db.getUserByEmail(user.email);

        // Compares plainText PW(user.password) and hashed PW (checkuser)
        const correctPassword = await bcrypt.compare(user.password, checkUser.password);

        if(correctPassword){
            const returnObj = {
                user: {
                    email: checkUser.email,
                    username: checkUser.username,
                    id: checkUser._id
                }
            };

            // Generate JWT
            returnObj.token = JWT.generateToken(returnObj);

            return returnObj;
        }

        return false;

    } catch (error){
        console.error('Error checking password: \n' + error);
        throw new Error('       Issue checking password. ');
    }
}

async function createUser(userInfo){
    
    // Check DB to see if email is already registered
    try{

        if(!await db.checkEmail(userInfo.email)){
            return false;
        }
        userInfo.password = await hashPassword(userInfo.password);

        db.createNewUser(userInfo);

        return true;
    } catch(error){
        console.log('Error hashing the password: \n' + error);
        throw new Error('       Error creating user. ');
    }
}

module.exports = {
    getUsersById,
    getUsers,
    createUser,
    verifyUser,
}