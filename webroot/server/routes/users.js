/**
 * 
 *          Manging the '/api/users/' endpoint 
 * 
 */


// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

const fs = require('fs');

// For email validation
const validator = require('validator');

// This is were the data will be sent to
const userHandler = require('../handlers/users_handler');

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
        res.status(500).json({error: 'Failed to get user\n\n'});
    }
});

/*          POST Methods          */

router.post('/signup', async (req, res) => {
    try{
        console.log(req.body);

        const content = req.body.content; 

        /*       Verify email         */
        if(!validator.isEmail(content.email)){
            res.status(400).json({ error: "Need to use a valid email." });
        }

        /*       Verify Password      */
        if(content.password.length < 8){
            res.status(400).json({ 
                error: "Password does not meet requirements. ",
                details: "Password is too short. "
             });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        if(passwordRegex.test(content.password)){
            res.status(400).json({ 
                error: "Password does not meet requirements. ",
                details: "Password does not have a special character. " });
        }

        // TODO: check DB for email, then create user information in DB return user to login page so they can verify info
        // Check DB for email
        if(!userHandler.createUser(content)){
            res.status(409).json({ error: "Email is already registered! "});
        }


        res.status(200).json({ message: "Login Page" });

    } catch(error){
        console.error(error);
        res.status(401).json({ error: "Error signing up. "});
    }
})

// Sign-In
router.post('/signin', async (req, res) => {
    try{
        req.body.data

        // TODO: Get user info, 
        // verify the information is formated correctly here.
        // Verify sent credentials in ../handlers/user_handler or ../db/user_db_functions.
        // Create a token in utils/jwt
        // Send back username/email, token, and MAYBE user ID (probably not ID since it will be avaiable to public)
    } catch(error){
        // TODO: have different errors for differnt issues (i.e wrong information)
        res.status(401).json({ error: "Error Signing in." });
    }
});

// Sign-Out
router.post('/signout', async (req, res) => {
    try{
        // TODO: Get user info and verify JWT
    }catch(error){
        res.status(500).json({ error: "Error Signing out." })
    }
})

// Exports this router to be used in app.js
module.exports = router;    