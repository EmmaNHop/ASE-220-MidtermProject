// Get environment variables (Mostly Cohere API key)
require('dotenv').config();

// Package designed to build the ss app for requests
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// tells the 'app' that the data will be in JSON format 
app.use(express.json());

/*
 *          Define Routes
 */
const postRoutes = require('./routes/posts.js');
const tagRoutes = require('./routes/tags.js');
const userRoutes = require('./routes/users.js');

app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

//      Static Routes
app.use(express.static(path.join(__dirname, 'public')));

/*       Default route      */
app.get('/', (req, res)=>{
    try{
        res.send(fs.readFileSync('./public/index.html','utf-8'));
    } catch(error){
        return res.status(404).json({error : "Page not Found"});
    }
});

app.get('/detail', (req, res)=>{
    res.send('HTML ENDPOINT: details')
});

app.get('/login', (req, res) => {
    res.redirect('/login.html');
})


/*      API ENDPOINTS       */

app.get('/api', (req, res)=>{
    let content;
    // Check if the file exists
    if (fs.existsSync('./data.json')) {
        content = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    } else {
        // If the file doesn't exist, send an error or empty content
        content = { error: 'File not found' };
    }

    // Send the response
    res.json(content);
});

app.post('/api', (req, res)=>{
    let content = req.body;
    fs.writeFileSync('./data.json', JSON.stringify(content));
    res.send(JSON.stringify(content));
});

app.put('/api', (req, res)=>{
    let content = req.body;
    fs.writeFileSync('./data.json', JSON.stringify(content));
    res.send(JSON.stringify(content));
});

app.delete('/api', (req, res)=>{
    let content = {};
    if(fs.existsSync('./data.json')) fs.unlinkSync('./data.json')
    res.send(JSON.stringify({message:'Data deleted'}));
});

module.exports = app;