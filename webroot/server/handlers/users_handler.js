/**
 * 
 *          Handler for data coming from '../routes/users.js' All CRUD operations for users are done here
 *          Also verifies the user data using '../utils/jwt.js' to create and verify tokens
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/user_db_functions.js');

async function getUsersById(id){
    try{
        const data = await db.getUsersById(id);
    }catch(error){
        console.error('Error handling getting user by ID. \n    ' + error);
        throw new Error('Error handling users. \n');
    }
}

async function getUsers(){
    try{
        const data = await db.getUsers();
    }catch(error){
        console.error('Error handling getting users. \n     ' + error);
        throw new Error('Error handling users. \n');
    }
}

async function hashPassword(){

}

async function createUser(userInfo){
    
    if(db.checkEmail(userInfo.email)){
        return false;
    }

    // TODO: check the DB for user email to see if it is already in use
    // 
}

module.exports = {
    getUsersById,
    getUsers,
    createUser
}