/**
 *
 *          Handler for data coming from '../routes/posts.js' All CRUD operations for posts are done here
 *
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/post_db_functions.js');
const {client} = require("../db/db");


async function getAllPosts(){
    try{
        //const data = await 
    }catch(error){
        console.error('Error handling getting all posts. \n' + error);
        throw new Error('       Error handling posts. \n');
    }
}

async function getPostById(id){
    try{
        const data = await db.getPostById(id);
        return data;
    }catch(error){
        console.error('Error handling getting posts by ID. \n' + error);
        throw new Error('       Error handling posts. \n');
    }
}

async function getJobPosts(){
    try{
        const data = await db.getJobPosts();
        return data;
    }catch(error){
        console.error('Error handling for featured posts. \n' + error);
        throw new Error('       Error handling for featured posts. \n');
    }
}

async function getFeaturedPosts(){
    try{
        const data = await db.getFeaturedPosts();
        return data;
    }catch(error){
        console.error('Error handling for featured posts. \n' + error);
        throw new Error('       Error handling for featured posts. \n');
    }
}

async function getUserFeaturedPosts(username, type) {
    /* Why doesn't this have a try block? Also, this is not a user function why would we need a missing params message?
    if (!username || !type) {
        throw new Error('Missing username or type');
    }

    return await postDB.getUserFeaturedPosts(username, type);*/

    try{
        const data = await postDB.getUserFeaturedPosts(username, type);
        return data;
    }catch(error){
        console.error('Error handling for user\'s featured posts. \n' + error);
        throw new Error('       Error handling for user\'s featured posts. \n');
    }
}

async function getUserPosts(username) {
    try{
        const data = await postDB.getUserPosts(username);
        return data;
    }catch(error){
        console.error('Error handling for user\'s featured posts. \n' + error);
        throw new Error('       Error handling for user\'s featured posts. \n');
    }
}

async function getForSalePosts(){
    try{
        const data = await db.getForSalePosts();
        return data;
    }catch(error){
        console.error('Error handling for sale posts. \n' + error);
        throw new Error('       Error handling for sale posts. \n');
    }
}

async function createNewPost(post) {
    try{
        const postDate = new Date();

        const data = await db.createNewPost({
            user_id : post.user_id,
            created_by : post.created_by,
            date_created : `${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}`,
            time_created : `${postDate.getHours()}-${postDate.getMinutes()}-${postDate.getSeconds()}`,
            post_title : post.post_title,
            type : post.type,
            city : post.city,
            state : post.state,
            price : post.price,
            post_views : 0,
            is_job : post.is_job,
            img : post.img,
            post_content : post.post_content,
            is_featured : post.is_featured
        });

        return data;
    }catch(error) {
        console.error('Error handling for new post. \n' + error);
        throw new Error('       Error handling for new post. \n');
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getJobPosts,
    getFeaturedPosts,
    getForSalePosts,
    createNewPost,
    getUserFeaturedPosts,
    getUserPosts
}