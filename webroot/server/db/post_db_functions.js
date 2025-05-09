/**
 * 
 *      All functions pertaining to the database in the posts collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');
const { object } = require('cohere-ai/core/schemas');

// Client will call this as when the page is first loaded and store it in cache 
async function getRecentPosts() {
    // Connect the client to the server    (optional starting in v4.7)
    try{

        const recents = await client.db('GregsList').collection('Posts').find().sort({ timestamp : -1}).toArray();
        return recents;
    }catch(error){
        console.error('Error getting recent posts. \n       ' + error);
        throw new Error('Error getting recent posts. \n');
    }
}

async function getPostById(id) {
    try{
       const post = await client.db('GregsList').collection('Posts').findOne({ _id: new ObjectId(id) });
        if(!post){
            throw new Error(`Post with ID:${id} was not found.\n`);
        }
        return post;
    }catch(error){
        console.error('Error getting post by ID from database. \n       ' + error);
        throw new Error('Error getting post by ID from database. \n');
    }
}

async function getPostsUserFeatured(userId, type) {
    try {
        const db = client.db('GregsList');
        const posts = await db.collection('Posts').find({
            user_id: userId,
            type: type
        }).toArray();
        return posts;
    } catch (err) {
        console.error("DB error:", err);
        throw new Error('Database fetch failed');
    }
}

async function getFeaturedPosts() {
    try{
        const featured = await client.db('GregsList').collection('Posts').find({is_featured: true}).toArray();
        return featured;
    }catch(error){
        console.error('Error getting featured posts from database. \n       ' + error);
        throw new Error('       Error getting featured posts from database. \n');
    }
}

async function getUserFeaturedPosts(id) {
    try {
        const posts = await client.db('GregsList').collection('Posts').find({user_id: id, is_featured: true}).toArray(); // or whatever your collection is named;
        return posts;

    } catch (error) {
        console.error("Error fetching user featured posts: \n", error);
        throw new Error('       Error getting user\'s featured posts from database. \n');
    }
}

async function getUserPosts(userId, type) {
    try {
        if(type == "jobs") {
            const posts = await client.db('GregsList').collection('Posts').find({user_id : userId, is_job: true}).toArray(); // or whatever your collection is named
            return posts;
        } else {
            const posts = await client.db('GregsList').collection('Posts').find({user_id : userId, is_job: false}).toArray();
            return posts
        }
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}

async function getForSalePosts() {
    try{
        const featured = await client.db('GregsList').collection('Posts').find({is_job: false}).toArray();
        return featured;
    }catch(error){
        console.error('Error getting for sale posts from database. \n       ' + error);
        throw new Error('       Error getting for sale posts from database. \n');
    }
}

async function getJobPosts() {
    try{
        const featured = await client.db('GregsList').collection('Posts').find({is_job: true}).toArray();
        return featured;
    }catch(error){
        console.error('Error getting job posts from database. \n        ' + error);
        throw new Error('       Error getting job posts from database. \n');
    }
}

async function createNewPost(post) {
    try{


        const newPost = await client.db('GregsList').collection('Posts').insertOne(post, function(err){
            if(err) throw new Error('       Error communicating with MongoDB');

            var objectId = post._id;
        });

        return newPost.insertedId.toString();

    }catch(error){
        console.error('Error inserting post to database. \n        ' + error);
        throw new Error('       Error inserting post to database. \n');
    }

}

async function editPost(post, postId) {
    try{
        const query = { _id: new ObjectId(postId) };

        const newPost = await client.db('GregsList').collection('Posts').replaceOne(query, post);

        console.log(newPost);

    }catch(error){
        console.error('Error putting edited post to database. \n        ' + error);
        throw new Error('       Error putting edited post to database. \n');
    }
}

async function deletePost(postId){
    try{
        const result = await client.db('GregsList').collection('Posts').deleteOne({ _id: new ObjectId(postId)});

        if(result.deletedCount === 1){
            return true;
        }
        else{
            throw new Error('Error accessing database! \n');
        }

    }catch(error){
        console.error('Error inserting post to database. \n        ' + error);
        throw new Error('       Error inserting post to database. \n');
    }
}

// Export all the functions that will be called outside of this file
module.exports = {
    getRecentPosts,
    getPostById,
    getPostsUserFeatured,
    getForSalePosts,
    getJobPosts,
    createNewPost,
    getFeaturedPosts, 
    getUserFeaturedPosts,
    getUserPosts,
    editPost,
    deletePost
}