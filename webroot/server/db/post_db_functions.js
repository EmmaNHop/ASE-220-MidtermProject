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
        console.log("post!:" + post);
        return post;
    }catch(error){
        console.error('Error getting post by ID from database. \n       ' + error);
        throw new Error('Error getting post by ID from database. \n');
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
            created_by : post.user,
            date_created : post.date,
            time_created : post.timestamp,
            post_title : post.title,
            type : post.type,
            city : post.city,
            state : post.state,
            price : post.price,
            post_views : 0,
            is_job : post.job,
            img : post.img,
            post_content : post.content,
            is_featured : post.featured
        });
    }catch(error){
        console.error('Error inserting post to database. \n        ' + error);
        throw new Error('       Error inserting post to database. \n');
    }

}

// Export all the functions that will be called outside of this file
module.exports = {
    getRecentPosts,
    getPostById,
    getFeaturedPosts,
    getForSalePosts,
    getJobPosts,
    createNewPost
}