/*
 * 
 *          Starts the server
 * 
 */

// Imports express
const app = require('./app');

const { connectToDatabase } = require('./db/db');  
const { getRecentPosts } = require('./db/db_functions.js');
const { writeToServerCache } = require('./cache/cache_functions.js')

// Grabs the port from the enviroment variable
//console.log(process.env.PORT);
const PORT = process.env.PORT;

// Starts the server and will trigger express listening for requests
(async () => {
    await connectToDatabase(); 

    let recents = await getRecentPosts();

    app.listen(PORT, () => {
        console.log(`Example app listening on http://localhost:${PORT}`);
    });
})();

// Updates server cache every 1 min
setInterval(async () => {
    console.log("Updating Server Cache...");
    let recents = await getRecentPosts();
    await writeToServerCache(recents);
}, 60000); // 1 min
