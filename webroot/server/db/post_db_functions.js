/**
 * 
 *      All functions pertaining to the database in the posts collection
 * 
 */

const { ObjectId } = require('mongodb');
const { client } = require('./db');

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

async function getPostsUserFeatured(username, type) {
    try {
        const db = client.db('GregsList');
        const posts = await db.collection('Posts').find({
            created_by: username,
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

async function getUserFeaturedPosts(username) {
    try {
        const collection = await db.getCollection('posts'); // or whatever your collection is named

        const query = {
            created_by: username,
            is_featured: true // assuming there's a flag to identify featured posts
        };

        const posts = await collection.find(query).toArray();
        return posts;

    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}

async function getUserPosts(username) {
    try {
        const posts = await db.getCollection('posts').find({created_by : username}).toArray(); // or whatever your collection is named
        return posts;

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
        const newPost = await client.db('GregsList').collection('Posts').insertOne({
            user_id : post.user_id,
            created_by : post.created_by,
            date_created : post.date_created,
            time_created : post.time_created,
            post_title : post.post_title,
            type : post.type,
            city : post.city,
            state : post.state,
            price : post.price,
            post_views : 0,
            is_job : post.is_job,
            img : post.img,
            post_content : post.post_content,
            is_featured : post.is_featured,
            tags: post.tags
        });
        return newPost;
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
    getUserPosts
}