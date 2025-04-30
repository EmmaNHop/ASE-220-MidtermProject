/*
 * 
 *          Starts the server
 * 
 */

// Imports express
const app = require('./app');

/*      DB      */
// Starts the DB
const { connectToDatabase } = require('./db/db');  

// Pulls most recent to store in cache
const { getRecentPosts } = require('./db/post_db_functions.js');
const { writeToServerCache } = require('./cache/cache_functions.js')


/*      .env       */
// Grabs the port from the enviroment variable
const PORT = process.env.PORT;


// Starts the server and will trigger express listening for requests
(async () => {
    await connectToDatabase(); 

    // Grabs recent posts and stores it to server in './cache/cache_functions'
    // This is the first set of data a user will see
    let recents = await getRecentPosts();
    writeToServerCache(recents);

    app.listen(PORT, () => {
        console.log(`Example app listening on http://localhost:${PORT}`);
    });
})();

// Updates server cache every 1 min with most recent posts in DB
setInterval(async () => {
    //console.log("Updating Server Cache...");
    let recents = await getRecentPosts();
    await writeToServerCache(recents);
}, 60000); // 1 min
