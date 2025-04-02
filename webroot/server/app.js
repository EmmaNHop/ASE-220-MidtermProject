// Get environment variables (Mostly Cohere API key)
require('dotenv').config();

// Package designed to build the ss app for requests
const express = require('express');
const app = express();
const fs = require('fs');

// tells the 'app' that the data will be in JSON format 
app.use(express.json());

/*
 *          Define Routes
 */
const tagRoutes = require('./routes/tags.js');
const userRoutes = require('./routes/users');

app.use('/api/tags', tagRoutes);
//app.use('/api/users', userRoutes);

/* HTML ENDPOINTS */
app.get('/', (req, res)=>{
    res.send('HTML ENDPOINT: index')
});

app.get('/detail', (req, res)=>{
    res.send('HTML ENDPOINT: details')
});


/* API ENDPOINTS */
app.get('/api', (req, res)=>{
    let content = fs.existsSync('./data.json') ? JSON.parse(fs.readFileSync('./data.json', 'utf-8')) : 
    res.send(JSON.stringify(content));
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