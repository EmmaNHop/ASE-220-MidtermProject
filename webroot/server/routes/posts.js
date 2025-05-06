/**
 *          Recieves all requests to /api/posts
 */

const express = require('express');

// What allows app.js to route all /api/post endpoints to here
const router = express.Router();

// Establish Handler
const postHandler = require('../handlers/posts_handler');

// Read/Write from cache
const cache = require('../cache/cache_functions');
const { ObjectId } = require('mongodb');


/*      ENDPOINTS       */

/* Gets the default posts (Most recent) if there is no query param
    if(no param)
        get posts from server Cache which is most recent
*/
// Default route
router.get('/', async (req, res) => {

    // Query Param 
    const { filter } = req.query;

    var content = [];

    try{
        if(filter){

            // TODO: filtered post handler
            //content = await postHandler.getFilteredPosts();

            if(!content){
                return res.status(404).json({ error: `Invalid filter. Filter: ${filter} not found. \n`});
            }

            res.status(200).send(content);
        } else{
            content = await cache.readFromServerCache();
            console.log(content);
            return res.status(200).json(content);
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({error : 'Error accessing posts. \n'});
    }
});

// Gets a post by ID

router.get('/id/:id', async (req, res) =>{
    try{
        if(!ObjectId.isValid(req.params.id)){
            console.error(` Invalid Object ID: ${id}`);
            return res.status(400).json({ error: ` Invalid Object ID: ${id}`});
        }
        let post = await postHandler.getPostById(req.params.id);
        console.log("Route");
        console.log(post);
        res.status(200).json(post);
    } catch(error){
        console.error(error);
        res.status(500).json({error : 'Failed to get post. \n'});
    }
});


// Gets featured posts 
router.get('/featured', async (req, res) => {

    const { filter } = req.query;

    var content = [];

    try{
        if(filter){

            //content = await postHandler.getFilteredPosts();

            if(!content){
                return res.status(404).json({ error: `Invalid filter. Filter: ${filter} not found. \n`});
            }

            res.status(200).send(content);
        } else{
            
            const content = await postHandler.getFeaturedPosts();

            return res.status(200).send(content);
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({error : 'Error accessing posts. \n'});
    }
});

// Gets for sale posts
router.get('/for_sale', async (req, res) => {

    const { filter } = req.query;

    var content = [];

    try{
        if(filter){

            //content = await postHandler.getFilteredPosts();

            if(!content){
                return res.status(404).json({ error: `Invalid filter. Filter: ${filter} not found. \n`});
            }

            res.status(200).send(content);
        } else{
            
            const content = await postHandler.getForSalePosts();

            return res.status(200).send(content);
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({error : 'Error accessing posts. \n'});
    }
});

// Gets job posts
router.get('/job', async (req, res) => {

    const { filter } = req.query;

    var content = [];

    try{
        if(filter){

            //content = await postHandler.getFilteredPosts();

            if(!content){
                return res.status(400).json({ error: `Invalid filter. Filter: ${filter} not found. \n`});
            }

            res.status(200).send(content);
        } else{
            
            const content = await postHandler.getForSalePosts();

            return res.status(200).send(content);
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({error : 'Error accessing posts. \n'});
    }
});

router.post('/post', async (req, res) => {
    try{
        console.log(req.body);
        const content = req.body.content; 
        //createNewPost();


        return res.status(200);

    }catch(error) {
        console.error(error);
        return res.status(500).json({error : 'Error inserting post. \n'});
    }
});

module.exports = router;