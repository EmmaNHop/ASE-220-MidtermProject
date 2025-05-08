/*          JSON BLOB URLS          */
// POST API URL: https://jsonblob.com/1348018515168387072
//var posts_URL = "https://jsonblob.com/api/jsonBlob/1348018515168387072";

/* 
*
*           API URLS    
*      
*/


/*          GET METHODS         */

async function getAll(Axios){
    try{
        let posts = await axios.get('http://localhost:3000/api/posts');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.log('Error getting recent posts. \n      ' + error);
    }
}

async function getPostById(Axios, id){
    try{
        console.log(id);

        let post = await Axios.get(`http://localhost:3000/api/posts/id/${id}`);

        return post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

//  Get all featured posts 
async function getFeaturedPosts(Axios, lowerLimit, upperLimit){
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/featured');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting featured posts. \n     ' + error);
    }
}

async function getUserFeatured(Axios, user){
    try {
        let response = await Axios.get(`http://localhost:3000/api/posts/user_posts/${user}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return []; // Always return an array to avoid crashing
    }
}

async function getForSale(Axios, lowerLimit, upperLimit){
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/for_sale');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting for sale posts. \n     ' + error);
    }
}

async function getUserForSale(Axios, user){

}

async function getJobs(Axios, lowerLimit, upperLimit){
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/jobs');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting job posts. \n     ' + error);
    }
}


async function getUserJobs(Axios, user){

}

/*          PUT METHODS            */

async function addNewPost(Axios, data){
    try{
        let tags = await Axios.post('http://localhost:3000/api/tags/create', {
            content: {
                post_content : data.post_content
            }
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        console.log(tags.data.tags);

        let post = await Axios.post('http://localhost:3000/api/posts/post', {
            content: {
                user_id : data.user_id,
                created_by : data.created_by,
                post_title : data.post_title,
                type : data.type,
                city : data.city,
                state : data.state,
                price : data.price,
                is_job : data.is_job,
                img : data.img,
                post_content : data.post_content,
                is_featured : data.is_featured, 
                tags: tags.data.tags
            }
        },
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then( function (response){
            console.log(response);
        });
    }catch(error) {
        console.error('Error making post. \n' + error);
        throw new Error('       Error making post. \n');
    }
}