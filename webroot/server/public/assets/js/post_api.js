/* 
*
*           API URLS    
*      
*/

/*          GET METHODS         */

async function getAll(Axios) {
    try{
        let posts = await axios.get('http://localhost:3000/api/posts');

        //console.log(posts.data);

        return posts.data;

    } catch(error){
        console.log('Error getting recent posts. \n      ' + error);
    }
}

async function getPostById(Axios, id) {
    try{
        let post = await Axios.get(`http://localhost:3000/api/posts/id/${id}`);

        console.log(post);

        return post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

//  Get all featured posts 
async function getFeaturedPosts(Axios, lowerLimit, upperLimit) {
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/featured');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting featured posts. \n     ' + error);
    }
}

async function getUserFeatured(Axios, user) {
    try {
        let response = await Axios.get(`http://localhost:3000/api/posts/user_posts/${user}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return []; // Always return an array to avoid crashing
    }
}

async function getForSale(Axios, lowerLimit, upperLimit) {
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/for_sale');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting for sale posts. \n     ' + error);
    }
}

async function getUserForSale(Axios, user) {
    try{
        let posts = await Axios.get(`http://localhost:3000/api/posts/user_posts/${user}`);

        return posts.data;

    } catch(error){
        console.error('Error getting job posts. \n     ' + error);
    }
}

async function getJobs(Axios, lowerLimit, upperLimit) {
    try{
        let posts = await Axios.get('http://localhost:3000/api/posts/jobs');

        console.log(posts.data);

        return posts.data;

    } catch(error){
        console.error('Error getting job posts. \n     ' + error);
    }
}

async function getUserJobs(Axios, user) {
    try{
        let posts = await Axios.get(`http://localhost:3000/api/posts/user_posts/${user}`);

        return posts.data;

    } catch(error){
        console.error('Error getting job posts. \n     ' + error);
    }
}

/*          POST METHODS            */

async function addNewPost(Axios, data) {
    try{
        let tags = await Axios.post('http://localhost:3000/api/tags/create', {
            content: {
                post_content : data.post_content
            }
        }, 
        {
            headers: {
                Authorization:'Bearer ' + sessionStorage.getItem('token')
            }
        });

        let post = await Axios.post(`http://localhost:3000/api/posts/user/${data.user_id}/newPost`, {
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

            // TODO: Maybe a loading screen in here?

            window.location.replace(`./itemDetail.html?id=${response.data}&type=f`);
        });
    }catch(error) {
        console.error('Error making post. \n' + error);
        throw new Error('       Error making post. \n');
    }
}

/*          PUT METHOD              */
async function editPost(Axios, data, postId) {
    try{
        const tags = await Axios.post('http://localhost:3000/api/tags/create', {
            content: {
                post_content : data.post_content
            }
        }, 
        {
            headers: {
                Authorization:'Bearer ' + sessionStorage.getItem('token')
            }
        });

        // Add new tags
        data.tags = tags.data.tags;

        console.log(data);

        const response = await Axios.put(`http://localhost:3000/api/posts/user/${data.user_id}/edit/${postId}`, {
            content: { 
                data 
            }
        },
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(res);
            if(res.status === 201){
            console.log("here");
                if(data.is_featured === true){
                    window.location.replace(`itemDetail.html?id=${postId}&type=f`);
                }
                else if(data.is_job === true){
                    window.location.replace(`itemDetail.html?id=${postId}&type=j`);
                }
                else if(data.is_job === false){
                    window.location.replace(`itemDetail.html?id=${postId}&type=s`);
                }
            }
        });

    }catch(error) {
        console.error('Error making post. \n' + error);
        throw new Error('       Error making post. \n');
    }
}

/*        DELETE METHOD             */
async function deletePost(Axios, postId) {
    try{
        let response = await Axios.delete(`http://localhost:3000/api/posts/user/${data.user_id}/delete/${postId}`,
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => {

            // TODO: Maybe a loading screen in here?
            if(response.status === 200) {
                window.location.replace(`./dashboard.html`);
            }
        });
    }catch(error) {
        console.error('Error making post. \n' + error);
        throw new Error('       Error making post. \n');
    }
}