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
            throw new Error(`Post with ID:${id} was not found.\n`);
        }
        return post;
    }catch(error){
        console.error('Error getting post by ID from database. \n       ' + error);
        throw new Error('Error getting post by ID from database. \n');
    }
}