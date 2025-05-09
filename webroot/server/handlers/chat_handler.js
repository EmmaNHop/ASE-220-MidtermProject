/**
 * 
 *          Handler for data coming from '../routes/chat.js' All CRUD operations for chats are done here
 * 
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/chat_db_functions.js');


async function getChatById(id){
    try{
        const data = await db.getChatById(id);
        return data;
    }catch(error){
        console.error('Error handling getting chat by ID. \n' + error);
        throw new Error('       Error handling chat. \n');
    }
}

async function getUsersChats(id){
    try{
        const data = await db.getUsersChats(id);
        return data;
    }catch(error){
        console.error('Error handling getting user\'s chats. \n' + error);
        throw new Error('       Error handling chats. \n');
    }
}

async function createChat(chatInfo){
    try{
        const postDate = new Date();
        const data = await db.createChat({
            //userA will initiate this creation
            userA_id : chatInfo.userA_id,
            userB_id : chatInfo.userB_id,
            userA_name : chatInfo.userA_name,
            userB_name : chatInfo.userB_name,
            //will set initial message
            messages : [{
                content : chatInfo.messages[0].content,
                sender_name : chatInfo.userA_name,
                sender_id : chatInfo.userA_id,
                time : `${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}  ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`
            }]});
        return data;
    }catch(error){
        console.error('Error handling posting user\'s chat. \n' + error);
        throw new Error('       Error handling chat. \n');
    }
}

async function sendMessage(messageInfo){
    try{
        const postDate = new Date();
        const chat = await getChatById(messageInfo.chat_id);

        const message = {
            chat_id : messageInfo.chat_id,
            messages : [{
                content : messageInfo.messages[0].content,
                sender_name : messageInfo.messages[0].sender_name,
                sender_id : messageInfo.messages[0].sender_id,
                time : `${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}  ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`
            }]};

        chat.messages.push(message.messages[0]);

        const data = await db.sendMessage(chat, message.chat_id);
        return data;
    }catch(error){
        console.error('Error handling updating user\'s chat. \n' + error);
        throw new Error('       Error handling chat. \n');
    }
}

module.exports = {
    getChatById,
    getUsersChats,
    createChat,
    sendMessage
}