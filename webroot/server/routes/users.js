/**
 * 
 *          Manging the '/api/users/' endpoint 
 * 
 */


// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

const fs = require('fs');

// This is were the data will be sent to
const tagsHandler = require('../handlers/users_handler');

/*        GET Methods       */

// Get a list of users (Maybe??)
router.get('/', async (req, res) => {

});

// Get a certain user
router.get('/:userid', async (req, res) => {
    console.log(req.params.userid);

    try{
        // TODO: get user here
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get user\n\n'});
    }
});

/*          POST Methods          */

// Sign-In
router.post('/signin', async (req, res) => {
    try{
        req.body
    } catch(error){
        res.status(401).json({ error: error.message });
    }
});

// Exports this router to be used in app.js
module.exports = router;    