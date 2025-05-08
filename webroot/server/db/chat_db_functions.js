/**
 * 
 *      All functions pertaining to the database in the chats collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');


async function getChatById(id) {
    try{
       const post = await client.db('GregsList').collection('Chats').findOne({ _id: new ObjectId(id) });
        if(!post){
            throw new Error(`Chat with ID:${id} was not found.\n`);
        }
        return post;
    }catch(error){
        console.error('Error getting chat by ID from database. \n       ' + error);
        throw new Error('Error getting chat by ID from database. \n');
    }
}

async function getUsersChats(id) {
    try{
        const post1 = await client.db('GregsList').collection('Chats').find({ userA_id: new ObjectId(id) }).toArray();
        const post2 = await client.db('GregsList').collection('Chats').find({ userB_id: new ObjectId(id) }).toArray();
        const post = post1.concat(post2);
        if(!post){
            throw new Error(`Chats with ID:${id} was not found.\n`);
        }
        return post;
    }catch(error){
        console.error('Error getting user\'s chats from database. \n       ' + error);
        throw new Error('Error getting user\'s chats from database. \n');
    }
}

module.exports = {
    getChatById,
    getUsersChats
}