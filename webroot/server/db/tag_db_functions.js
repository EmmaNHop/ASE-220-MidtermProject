/**
 * 
 *      All functions pertaining to the database in the posts collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');

// Client will call this as when the page is first loaded and store it in cache 
async function getAllPostByTag(tag) {
    // Connect the client to the server    (optional starting in v4.7)
    try{

        const recents = await client.db('GregsList').collection('Posts').find().sort({ timestamp : -1}).toArray();
        return recents;
    }catch(error){
        console.error('Error getting recent posts. \n       ' + error);
        throw new Error('Error getting recent posts. \n');
    }
}
