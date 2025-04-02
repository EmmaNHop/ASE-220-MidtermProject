// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

const fs = require('fs');

// This is were the data will be sent to
const tagsHandler = require('../handlers/users_handler');


// Exports this router to be used in app.js
module.exports = router;    