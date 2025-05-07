/**
 * 
 *          Handler for data coming from '../routes/chat.js' All CRUD operations for chats are done here
 * 
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/post_db_functions.js');


async function getChatById(id){
    try{
        const data = await db.getChatById(id);
        return data;
    }catch(error){
        console.error('Error handling getting chat by ID. \n' + error);
        throw new Error('       Error handling chat. \n');
    }
}

module.exports = {
    getChatById
}