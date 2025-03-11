// POST API URL: https://jsonblob.com/1348018515168387072

var posts_URL = "https://jsonblob.com/api/jsonBlob/1348018515168387072";


//          GET METHODS         //

async function getCommonPosts(Axios, postPerPage, pageNum){

    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.posts);
        return response.data.json.for_sale;
    }
    catch(error){
        console.log(error);
    }
}


async function getJobs(Axios, jobsPerPage, pageNum){
    
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.jobs);
        return response.data.json.job;
    }
    catch(error){
        console.log(error);
    }
}

async function getFeaturedPosts(Axios, featuredPerPage, pageNum){
    
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.featured);
        return response.data.json.featured;
    }
    catch(error){
        console.log(error);
    }
}

async function getAll(Axios){
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data);
        return response.data.json;
    }
    catch(error){
        console.log(error);
    }
}

//          END GET METHODS     //



//          POST METHODS        //

async function addNewCommonPost(Axios, data){

    try{
        fullJson = getAll(Axios)
        .then(json => {

            console.log(json);

            json.for_sale.push(data);

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
        //console.log(posts_URL);
    }
    catch(error){
        alert(console.log(error));
    }
    

}

async function addNewFeaturedPost(Axios, data){

    try{
        fullJson = getAll(Axios)
        .then(json => {

            json.featured.push(data);

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
    }
    catch(error){
        alert(console.log(error));
    }
}

async function addNewCommonJob(Axios, data){

    try{
        fullJson = getAll(Axios)
        .then(json => {

            console.log(json);

            json.job.push(data);

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
    }
    catch(error){
        alert(console.log(error));
    }
    

}

async function addNewFeaturedJob(Axios, data){

    try{
        fullJson = getAll(Axios)
        .then(json => {

            console.log(json);

            json.featured.push(data);

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
        const response = await Axios.put(posts_URL, {data});
        posts_URL = response.headers.location;
        //console.log(posts_URL);
        }
    catch(error){
        alert(console.log(error));
    }
    

}


//          END POST METHODS    //


//          DELETE METHODS        //



//          END DELETE METHODS    //



//          PUT METHODS        //



//          END PUT METHODS    //





