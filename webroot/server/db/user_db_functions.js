/**
 * 
 *      All functions pertaining to the database in the users collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function getUserById(id) {
    try{
        const user = await client.db('GregsList').collection('Users').findOne({_id: new ObjectId(id)});
        if(!user){
            throw new Error(`user with ID:${id} was not found.\n`);
        }
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
        if(emailInDb !== null){
            return false;
        }
        return true;
    } catch(error) {
        console.error('Error checking if email is in Database.  \n');
    }
}

async function createNewUser(userInfo){
    try{

        const newUser = await client.db('GregsList').collection('Users').insertOne({ 
            username : userInfo.username,
            password : userInfo.password,
            email: userInfo.email,
            number: userInfo.number,
            birthday: userInfo.birthday
        });

    } catch(error){
        console.error('Error Creating New User. \n');
    }
}

async function getUserByEmail(userEmail){
    try{
        const user = await client.db('GregsList').collection('Users').findOne({ email: userEmail });

        return user;
    } catch(error){
        console.error('Error getting user from database: \n');
        throw new Error('       Error getting user by Email! \n');
    }
}

module.exports = {
    getUserById,
    getUsers,
    checkEmail,
    createNewUser,
    getUserByEmail
}