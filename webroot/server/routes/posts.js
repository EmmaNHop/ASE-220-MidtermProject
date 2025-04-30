/**
 *          Recieves all requests to /api/posts
 */

const express = require('express');

// What allows app.js to route all /api/post endpoints to here
const router = express.Router();

// Establish Handler
const postHandler = require('../handlers/posts_handler');

// R/W from cache
const cache = require('../cache/cache_functions');


/*      ENDPOINTS       */

/* Gets the default pets (Most recent) if there is no query param
    if(no param)
        get posts from server Cache which is most recent
*/
router.get('/', async (req, res) => {

    // Query Param 
    const { filter } = req.query;

    var content = [];

    try{
        // Check if type is set. If so, will get filtered list
        if(type){

            // TODO: post handler
            //content = await postHandler.getFilteredPosts();

            if(!content){
                return res.status(404).json({ error: `Type: ${type} not found`});
            }

            res.status(200).send(content);
        } else{
            content = await cache.readFromServerCache();
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({error : 'Error accessing posts'});
    }

})

module.exports = router;