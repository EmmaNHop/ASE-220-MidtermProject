/**
 * 
 *      All functions pertaining to the database in the users collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function getUserById(id) {
    try{
        const user = await client.db('GregsList').collection('Users').find({_id: ObjectId(id)}).toArray();
        return user;
    }catch(error){
        console.error('Error getting user by ID from database. \n');
        throw new Error('       Error getting user from database. \n');
    }
}

async function getUsers() {
    try{
        const users = await client.db('GregsList').collection('Users').findMany().toArray();
        return users;
    }catch(error){
        console.error('Error getting users from database. \n');
        throw new Error('       Error getting users from database. \n');
    }
}

async function checkEmail(userEmail) {
    try{
        const emailInDb = await client.db('GregsList').collection('Users').findOne({ email: userEmail });
        if(emailInDb){
            return false;
        }
        return true;
    } catch(error) {
        console.error('Error checking if email is in Database.  ')
    }
}

module.exports = {
    getUserById,
    getUsers,
    checkEmail
}