/**
 * 
 *          Used to log errors, new users, log ins, CRUD for posts
 *          and deletions of user accounts
 * 
 */

const fileWriter = require('./file_writer');

async function logEvent(event, error, details){
    const timeStamp = new Date().toISOString();

    const log = {
        timeStamp,
        
    }

}