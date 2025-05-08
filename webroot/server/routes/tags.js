/*
 * This is were HTTP methods for tags will be processed, then sent over to tags_handler in the 
 * tag ../handler directory
 * 
 */

// Create a router to be used in ../app.js
const express = require('express');
const router = express.Router();

// This is were the data will be sent to
const tagsHandler = require('../handlers/tags_handler');

// The prompt for the AI to create the tags
const systemPrompt = `Generate a JSON array of strings that are relevant keywords based on the following user post.  
    The keywords should be:
    - Single words or short, loosely linked phrases.
    - Related to the main topics, themes, or subjects of the post.
    - Prioritized based on relevance.
    - Avoiding unnecessary filler words.
    - Avoiding NSFW or inappropriate words.

    Return only a JSON Object of an array without any additional text.

    Output Example:
    ["keyword1", "keyword2", "keyword3", "short phrase"]`

// Format for response from Cohere
const responseFormat = {
    "type": "json_object",
    "schema": {
        "type": "object",
        "properties": {
            "tags": {
                "type": "array",
                "items": {"type": "string"}
            }
        },
        "required": ["tags"],
    }
}

// Retrieve API Key and Port num
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const PORT = process.env.PORT;

// Cohere api 
const { CohereClientV2 } = require('cohere-ai');

// AI models
const { models } = require('cohere-ai/api');

// Validates token
const auth = require('../middleware/auth.js');

// Establish connection to the Cohere API and authenticate the API Key
const cohere = new CohereClientV2({
    token: COHERE_API_KEY
});


router.post('/create', (req, res) => {
    let userContent = req.body.content;
    userContent = userContent.post_content;

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
            response_format : responseFormat,
            temperature : 0,
        })
        let content = response.message.content[0].text;

        content = JSON.parse(content);

        res.status(201).json(content);

    })();
});

router.get('/', async (req, res) => {
    try {
        let content = await tagsHandler.getTags(); 
        res.status(200).json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Failed to retrieve tags'})
    }
})

// Exports this router to be used in app.js
module.exports = router;    
