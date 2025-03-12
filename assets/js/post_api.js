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

async function getUserFeatured(Axios){
    try{
        const response = await Axios.get(posts_URL, {});
        ///console.log(response.data.json.featured);
        var userFeatured = [];
        var featured = response.data.json.featured;

        featured.forEach(feature => {
            if(feature.created_by == localStorage.getItem('username')){
                userFeatured.push(feature);
            }
        });
        return userFeatured;
    }
    catch(error){
        console.log(error);
    }
}

async function getUserJobs(Axios){
    try{
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.json.job);
        var userJobs = [];
        var jobs = response.data.json.job;

        jobs.forEach(job => {
            if(job.created_by == localStorage.getItem('username')){
                userJobs.push(job);
            }

        });
        return userJobs;
    }
    catch(error){
        console.log(error);
    }
}

async function getUserPosts(Axios){
    try{
        var userPosts = [];
        const response = await Axios.get(posts_URL, {});
        //console.log(response.data.posts);
        var posts = response.data.json.for_sale;

        posts.forEach((post) => 
            userPosts.push(post)
        )
        return userPosts;
    }
    catch(error){
        console.log(error);
    }
}

//          END GET METHODS     //



//          PUT METHODS        //

async function addNewCommonPost(Axios, data){

    try{
        fullJson = getAll(Axios)
        .then(json => {

            console.log(json.for_sale[json.for_sale.length-1]);

            lastItem = json.for_sale[json.for_sale.length-1];

            data.id = lastItem.id + 1;

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

            console.log(json.featured.length);

            data.id = json.featured.length;

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

            data.id = json.job.length;

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


            json.featured[data.id] = data;

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

async function addForSaleByID(Axios, data){
    try{
        fullJson = getAll(Axios)
        .then(json => {

            json.for_sale[data.id] = data;

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
        //console.log(posts_URL);
    }
    catch(error){
        alert(console.log(error));
    }
}

async function addJobByID(Axios, data){
    try{
        fullJson = getAll(Axios)
        .then(json => {

            json.job[data.id] = data;

            const response = Axios.put(posts_URL, {json});
            //posts_URL = response.headers.location;

        })
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





