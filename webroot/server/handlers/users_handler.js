/**
 * 
 *          Handler for data coming from '../routes/users.js' All CRUD operations for users are done here
 *          Also verifies the user data using '../utils/jwt.js' to create and verify tokens
 */

const fs = require('fs').promises;
const path = require('path');

const db = require('../db/user_db_functions.js');