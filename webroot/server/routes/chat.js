/**
 * 
 *          Manging the '/api/chats/' endpoint 
 * 
 */


// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

// This is were the data will be sent to
const userHandler = require('../handlers/chat_handler.js');

const { ObjectId } = require('mongodb');


router.get('/chat/:chatid', async (req, res) => {
    console.log(req.params.chatid);

    try{
        if(!ObjectId.isValid(req.params.chatid)){
            console.error(` Invalid Object ID: ${id}`);
            return res.status(400).json({ error: ` Invalid Object ID: ${id}`});
        }
        let chat = await userHandler.getChatById(req.params.chatid);
        res.status(200).json(chat);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get user.'});
    }
});

