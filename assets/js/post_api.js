// POST API URL: https://jsonblob.com/1348018515168387072

//          GET METHODS         //



async function getCommonPosts(Axios, postPerPage, pageNum){

    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.posts);
        return response.data.posts;
    }
    catch(error){
        console.log(error);
    }
}


async function getJobs(Axios, jobsPerPage, pageNum){
    
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.jobs);
        return response.data.jobs;
    }
    catch(error){
        console.log(error);
    }
}

async function getFeaturedPosts(Axios, featuredPerPage, pageNum){
    
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.featured);
        return response.data.featured;
    }
    catch(error){
        console.log(error);
    }
}

//          END GET METHODS     //

async function addNewPost(Axios, data){

    try{
        const response = await Axios.post(posts_URL, {});
        //console.log(response.data.posts);
        return response.data.posts;
        }
    catch(error){
        console.log(error);
    }
    

}


//          POST METHODS        //




//          END POST METHODS    //


//          DELETE METHODS        //



//          END DELETE METHODS    //



//          PUT METHODS        //



//          END PUT METHODS    //


var posts_URL = "https://jsonblob.com/api/jsonBlob/1348018515168387072";



