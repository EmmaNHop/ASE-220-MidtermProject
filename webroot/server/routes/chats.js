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

const auth = require('../middleware/auth');

const { ObjectId } = require('mongodb');


router.get('/chat/:chatid', async (req, res) => {
    try{
        /*const token = req.headers.authorization;
        
        const authenticated = await auth.authenticateUser(token);
        
        if(!authenticated){
            console.log('User unauthorized');
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        }; */

        let chat = await userHandler.getChatById(req.params.chatid);
        res.status(200).json(chat);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get chat.'});
    }
});

router.get('/:userid', async (req, res) => {
    try{
/*
        const token = req.headers.authorization;
        
        const authenticated = await auth.authenticateUser(token);
        
        if(!authenticated){
            console.log('User unauthorized');
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        }; */


        let chats = await userHandler.getUsersChats(req.params.userid);
        res.status(200).json(chats);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get user\'s chats.'});
    }
});


router.post('/newChat', async (req, res) => {
    try{

        /*const token = req.headers.authorization;
        
        const authenticated = await auth.authenticateUser(token);
        
        if(!authenticated){
            console.log('User unauthorized');
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        };

        if(!ObjectId.isValid(req.body.content)){
            console.error(` Invalid Object ID: ${id}`);
            return res.status(400).json({ error: ` Invalid Object ID: ${id}`});
        }
        */
        console.log("ROUTE: ", req.body.content);
        let chats = await userHandler.createChat(req.body.content);
        res.status(200).json(chats);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to create user\'s chat.'});
    }
});

router.put('/:chatId', async (req, res) => {
    try{

        /*const token = req.headers.authorization;
        
        const authenticated = await auth.authenticateUser(token);
        
        if(!authenticated){
            console.log('User unauthorized');
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        };

        if(!ObjectId.isValid(req.body.content)){
            console.error(` Invalid Object ID: ${id}`);
            return res.status(400).json({ error: ` Invalid Object ID: ${id}`});
        }
        */
        let chats = await userHandler.sendMessage(req.body.content);
        res.status(200).json(chats);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed send user\'s message.'});
    }
});

module.exports = router;