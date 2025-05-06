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
        console.error('Error checking if email is in database.  \n' + error);
        throw new Error('       Error checking if email is in database \n');
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

        if(!newUser){
            throw new Error('Could not enter user into database! \n');
        }

    } catch(error){
        console.error('Error creating new user. \n' + error);
        throw new Error('       Error creating new user \n');
    }
}

async function getUserByEmail(userEmail){
    try{
        const user = await client.db('GregsList').collection('Users').findOne({ email: userEmail });

        return user;
    } catch(error){
        console.error('Error getting user from database: \n' + error);
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