/**
 * 
 *          Stores recents posts
 *          Updates every few minutes
 * 
 */

var cache = [];

async function writeToServerCache(recents){
    
    // Clear array
    cache.length = 0;

    cache = recents;
}

// Returns the cache array
async function readFromServerCache(){

    return cache;
    
}

module.exports = { writeToServerCache, readFromServerCache };