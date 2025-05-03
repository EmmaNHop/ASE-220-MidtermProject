/**
 * 
 *          Manging the '/api/users/' endpoint 
 * 
 */


// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

// For email validation
const validator = require('validator');

// This is were the data will be sent to
const userHandler = require('../handlers/users_handler');
//const { create } = require('domain');

/*        GET Methods       */

// Get a list of users (Maybe??)
router.get('/', async (req, res) => {

});

// Get a certain user
router.get('/user/:userid', async (req, res) => {
    console.log(req.params.userid);

    try{
        // TODO: get user here
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get user.'});
    }
});

/*          POST Methods          */

router.post('/signup', async (req, res) => {
    try{
        //console.log(req.body);
        const content = req.body.content; 

        /*       Verify email         */
        if(!validator.isEmail(content.email)){
            res.status(400).json({ error: 'Need to use a valid email.' });
            return;
        }

        /*       Verify Password      */
        if(content.password.length < 8){
            res.status(400).json({ 
                error: 'Password does not meet requirements. ',
                details: 'Password is too short. '
             });
             return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        if(passwordRegex.test(content.password)){
            res.status(400).json({ 
                error: 'Password does not meet requirements. ',
                details: 'Password does not have a special character. ' 
            });
            return;
        }

        // TODO: return user to login page so they can verify info by logging in

        // Will return false if the email is in the DB
        const isInDB = await userHandler.createUser(content);

        if(!isInDB){
            res.status(409).json({ error: 'Email is already registered! '});
            return;
        }

        try{
            res.redirect('/login.html');
        } catch(error){
            return res.status(404).json({error : 'Page not Found' });
        }
    } catch(error){
        console.error('Error during signup: \n' + error);
        res.status(401).json({ error: 'Error signing up. '});
    }
})

// Sign-In
router.post('/signin', async (req, res) => {
    try{
        // TODO:
        // verify the information is formated correctly here.

        let content = req.body.content;

        const userInfo = await userHandler.verifyUser(content);

        if(userInfo === false){
            res.status(401).json({ error: 'Incorrect Password' });
            return;
        }

        console.log(userInfo);
        res.status(200).json(userInfo);

    } catch(error){
        console.error('Error Signing in: \n' + error);
        res.status(401).json({ error: 'Error Signing in.' });
    }
});

// Sign-Out
router.post('/signout', async (req, res) => {
    try{
        // TODO: verify JWT and revoke current JWT
    }catch(error){
        res.status(500).json({ error: 'Error Signing out.' })
    }
})

// Exports this router to be used in app.js
module.exports = router;    