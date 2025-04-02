/*
 * Will handle data coming from ./routes/tags.js. Will either retrive, store, edit, or delete based on the
 * HTTP method used. Will store as a JSON file for now. 
 * 
 */

// The promises key word makes fs async and gives more processing power back to the server
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'tags.json');

// Common file writer to create and access Json
const fileWriter = require('../utils/file_writer');

// Will try and retrieve the tags from the JSON file
exports.getTags = async () => {

    try{
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch(error){
        console.error('Error reading tags.json');
    }

}

// Recieves data from ./routes/tags.js. Will process them add an ID and either create a new file or appenad to an existing one
exports.createTags = async (content) => {
    
    const dbTags = await exports.getTags();

    let arrLength = dbTags.tags.length;

    var tags = [];

    // Assign an ID to each tag and the tag name
    content = checkTags(content, dbTags.tags);

    content.forEach(tag =>{
        let obj = {
            tag_id : arrLength,
            tag_name : tag
        }
        tags.push(obj);
        arrLength++;
    });

    console.log("tags: " + tags);

    tags.forEach(tag =>{
        dbTags.tags.push(tag);
    });

    console.log(dbTags.tags);

    await fileWriter.writeToFile('./data/tags.json', JSON.stringify(dbTags, null, "\t")); 
    // TODO : return a req.status to ensure the we know the status of the request
    return;
}


// Makes sure no duplicate tags are entered
function checkTags(newTags, allTags){
    newTags.forEach((newTag, index) => {
        allTags.forEach(oldTag => {
            console.log(newTag + oldTag.tag_name);
            if(newTag == oldTag.tag_name){
                // Delete tag for now. TODO: create a bridge table
                newTags.splice(index, index);
            }
        });
    });
    return newTags;
}