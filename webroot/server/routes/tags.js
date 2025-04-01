// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

//const app = express();

// The prompt for the AI to create the tags
const systemPrompt = `Generate a JSON array of relevant keywords based on the following user post.  
    The keywords should be:
    - Single words or short, loosely linked phrases.
    - Related to the main topics, themes, or subjects of the post.
    - Prioritized based on relevance.
    - Avoiding unnecessary filler words.

    Return only a JSON array without any additional text.

    Output Example:
    ["keyword1", "keyword2", "keyword3", "short phrase"]`

// Format for response from Cohere
const responseFormat = {
    'type' : 'json_object',
    'schema' : {
        'type' : 'object',
        'properties' : {
            'tags' : {
                'type' : 'array'
            }
        },
        'required' : ['tags'],
    }
}

// Retrieve API Key and Port num
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const PORT = process.env.PORT;

// Cohere api 
const { CohereClientV2 } = require('cohere-ai');

// AI models
const { models } = require('cohere-ai/api');

// Establish connection to the Cohere API
const cohere = new CohereClientV2({
    token: COHERE_API_KEY
});


router.post('/', (req, res) => {
    let userContent = req.body;
    userContent = userContent.content;

    (async() => {
        const response = await cohere.chat({
            model: 'command-r-plus-08-2024',
            messages: [
                // This is the directions for the AI, this will create the tags from the user post
                {
                    role : 'system',
                    content : systemPrompt,
                },
                // This is the user post, that will be sent to create tags
                {
                    role: 'user',
                    content: userContent,
                }
            ],
            respose_format : responseFormat,
            temperature : 0,
        })
        console.log(response);
    })();
});

// Exports this router to be used in app.js
module.exports = router;    
