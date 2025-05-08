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
const userHandler = require('../handlers/users_handler.js');
//const { create } = require('domain');

const { ObjectId } = require('mongodb');

// validates token
const auth = require('../middleware/auth.js');

/*        GET Methods       */


// Get a list of users (Maybe??)
router.get('/', async (req, res) => {

});

// Get a certain user
router.get('/user/:userid', async (req, res) => {
    try{
        if(!ObjectId.isValid(req.params.userid)){
            console.error(` Invalid Object ID: ${id}`);
            return res.status(400).json({ error: ` Invalid Object ID: ${id}`});
        }
        let user = await userHandler.getUsersById(req.params.userid);
        res.status(200).json(user);

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to get user.'});
    }
});

/*          POST Methods          */

router.post('/signup', async (req, res) => {
    try{
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

        const specialCharacter = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

        if(!specialCharacter.test(content.password)){
            console.error('Password needs at least one special character! ');
            throw new Error('Password needs at least one speical character! ');
        }

        const uppercaseRegex = /^(?=.*[A-Z]).+$/;
        if(!uppercaseRegex.test(content.password)){
            console.error('Password needs at least one uppercase character! ');
            throw new Error('Password needs at least one uppercase character! ');
        }

        const lowercaseRegex = /^(?=.*[a-z]).+$/;
        if(!lowercaseRegex.test(content.password)){
            console.error('Password needs at least one lowercase character! ');
            throw new Error('Password needs at least one lowercase character! ');
        }

        const digitRegex = /^(?=.*\d).+$/;
        if(!digitRegex.test(content.password)){
            console.error('Password needs at least one number! ');
            throw new Error('Password needs at least one number! ');
        }

        // TODO: return user to login page so they can verify info by logging in

        // Will return false if the email is in the DB
        const isInDB = await userHandler.createUser(content);

        if(!isInDB){
            res.status(409).json({ error: 'Email is already registered! '});
            return;
        }

        // Try to redirect 
        try{
            res.redirect('/login.html');
        } catch(error){
            return res.status(404).json({error : 'Page not Found' });
        }
    } catch(error){
        console.error('Error during signup: \n' + error);
        res.status(401).json({ error: 'Error signing up. '});
    }
});

// Sign-In
router.post('/signin', async (req, res) => {
    try{
        // TODO:
        // verify the information is formated correctly here.

        const content = req.body.content;

        const userInfo = await userHandler.verifyUser(content);

        if(userInfo === false){
            res.status(401).json({ error: 'Incorrect Password' });
            return;
        }

        //Debug - Grab user token
        console.log(userInfo);
        try{
            res.status(200).json(userInfo);
        } catch(error){
            console.error('Page not found: \n' + error);
            return res.status(404).json({error : 'Page not Found' });
        }

    } catch(error){
        console.error('Error Signing in: \n' + error);
        res.status(401).json({ error: 'Error Signing in.' });
    }
});

// Sign-Out
router.post('/signout', async (req, res) => {
    try{

        const token = req.headers.authorization;

        const authenticated = await auth.authenticateUser(token);

        if(!authenticated){
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        };

        res.status(200).json({ message: 'OK' });

    } catch(error){
        res.status(500).json({ error: 'Error Signing out.' });
    }
});

// Example auth
router.post('/auth', async(req, res) => {
    try{

        const token = req.headers.authorization;

        const authenticated = await auth.authenticateUser(token);

        if(!authenticated){
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        };

        // TODO: return something here

    } catch(error){
        console.error('Error sending to auth: \n' + error);
        res.status(500).json({ error: 'Oopsie dasies!. '});
    }
});

// Will generate a new token for the user if they are signed in and using the app
router.post('/reauth', async(req, res) => {
    try{

        const token = req.headers.authorization;

        const authenticated = await auth.authenticateUser(token);

        if(!authenticated){
            console.error('User unauthorized');
            res.status(401).json({ error: 'Unauthorized Access! '});
            return;
        };

        const returnObj = await userHandler.reauth(authenticated);

        res.status(200).json({returnObj});

    } catch(error){
        console.error('Error reauthenticating user: \n' + error);
        res.status(500).json({ error: 'Error reauthenticating user '});
    }
})

// Exports this router to be used in app.js
module.exports = router;    