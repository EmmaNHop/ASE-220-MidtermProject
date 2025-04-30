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
        console.error('Error handling posts\n\n' + 'error:\n' + error);
        throw new Error('Error handling posts\n\n');
    }
}

async function getPostById(id){
    try{
        const data = await db.getPostById();
    }catch(error){
        console.error('Error handling pets\n\n' + 'error:\n' + error);
        throw new Error('Error handling pets\n\n');
    }
}

async function getFeaturedPosts(){
    try{
        const data = await db.getFeaturedPosts();
        return data;
    }catch(error){
        console.error('Error handling featured posts\n\n' +'error:\n' + error);
        throw new Error('Error handling featured posts\n\n');
    }
}

async function getForSalePosts(){
    try{
        const data = await db.getForSalePosts();
        return data;
    }catch(error){
        console.error('Error handling for sale posts\n\n' +'error:\n' + error);
        throw new Error('Error handling featured posts\n\n');
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getFeaturedPosts,
    getForSalePosts
}