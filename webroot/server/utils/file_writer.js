/**
 * 
 *  For writing to files, checking 
 * 
 */
const fs = require('fs').promises;
const path = require('path');

exports.writeToFile = async (path, content) => {
    
    // TODO : make try catch
    fs.writeFile(path, content);

    // Return something maybe?
    return;
}