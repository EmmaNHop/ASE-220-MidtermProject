/**
 * 
 *          Stores recents posts
 *          Updates every few minutes
 * 
 */

var cache = [];

async function writeToServerCache(recents){

    //debug
    //console.log("Retreiving recent posts");
    //console.log(recents);

    // Clear array
    cache.length = 0;

    cache = recents;
    
    //debug
    //console.log("Writing to Cache");
    //console.log(cache)
}

// Returns the cache array
async function readFromServerCache(){

    console.log("Reading From Server Cache");
    console.log(cache);

    return cache;
    
}

module.exports = { writeToServerCache, readFromServerCache };