/**
 * 
 *          Handler for data coming from '../routes/posts.js' All CRUD operations for posts are done here
 * 
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/post_db_functions.js');


async function getAllPosts(){
    try{
        //const data = await 
    }catch(error){
        console.error('Error handling getting all posts. \n' + error);
        throw new Error('Error handling posts. \n');
    }
}

async function getPostById(id){
    try{
        const data = await db.getPostById(id);
        return data;
    }catch(error){
        console.error('Error handling getting posts by ID. \n' + error);
        throw new Error('Error handling posts. \n');
    }
}

async function getFeaturedPosts(){
    try{
        const data = await db.getFeaturedPosts();
        return data;
    }catch(error){
        console.error('Error handling featured posts. \n' + error);
        throw new Error('Error handling featured posts. \n');
    }
}

async function getForSalePosts(){
    try{
        const data = await db.getForSalePosts();
        return data;
    }catch(error){
        console.error('Error handling for sale posts. \n' + error);
        throw new Error('Error handling for sale posts. \n');
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getFeaturedPosts,
    getForSalePosts
}