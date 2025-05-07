const token = sessionStorage.getItem('token');

const myAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

function htmlBuilder(query, html){
    let itemContainer = document.getElementById(query);
    itemContainer.insertAdjacentHTML("beforeend", html);
}

async function getUserFeatured(Axios){
    try {
        const response = await Axios.get('/posts/user_featured');
        return response.data;
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        return [];
    }
}

//start test
/*getUserFeatured(myAxios)
    .then(response => {
        console.log("Raw response from getUserFeatured:", response);

        // If it's nested under data, extract it:
        const userFeatured = Array.isArray(response) ? response : response?.data;

        if (!Array.isArray(userFeatured)) {
            console.error("userFeatured is not defined or not an array", userFeatured);
            return;
        }*/
getUserFeatured(myAxios)
    .then(userFeatured =>{
        var html = "";



        //console.log(userFeatured);
        if (!userFeatured || !Array.isArray(userFeatured)) {
            console.error("userFeatured is not defined or not an array", userFeatured);
            return;
        }

        const currentUser = sessionStorage.getItem('username');
        userFeatured = userFeatured.filter(post => post.created_by === currentUser);

        userFeatured.forEach((featured, index) => {

            if (!featured) {
                console.error(`Missing featured at index ${index}`, featured);
                return;
            }
            if (!featured.id) {
                console.warn(`Missing 'id' on featured at index ${index}`, featured);
            }
            if(featured.is_job === true){

                let htmlSegment =
                    `
                        <div data-bs-target="delete_target" id="${featured.id}" class="card product-report">
                            <div class="header">
                                <h2>${featured.post_title} <small>Posted: Date: ${featured.date_created} || Time: ${featured.time_created}</small></h2>
                                <ul class="header-dropdown m-r--5">
                                    <li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </a>
                                        <ul class="dropdown-menu pull-right">
                                            <li><a href="edit.html?id=${featured.id}&type=f">Edit</a></li>
                                            <li><a id="delete_user_featured" data-value="${featured.id}">Delete</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="body">
                                <div class="row clearfix m-b-15">
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        <p>Picture(s)</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        <p>Map</p>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        ${featured.post_content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;

                html += htmlSegment;
            }

            else if(featured.is_job === false){

                let htmlSegment =
                    `
                        <div data-bs-target="featured" id="${featured.id}" class="card product-report">
                            <div class="header">
                                <h2>${featured.post_title} <small>Posted: Date: ${featured.date_created} time: ${featured.time_created}</small></h2>
                                <ul class="header-dropdown m-r--5">
                                    <li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </a>
                                        <ul class="dropdown-menu pull-right">
                                            <li><a href="edit.html?id=${featured.id}&type=f">Edit</a></li>
                                            <li><a class="delete_user_featured" data-value="${featured.id}">Delete</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="body">
                                <div class="row clearfix m-b-15">
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        <p>could have pictures in here</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                        <p>could have location map similar to criagslists here</p>
                                    </div>
                                </div>
                                <div>
                                    <p>${featured.post_content}</p>
                                </div>
                            </div>
                        </div>
                    `;

                html += htmlSegment;

            }

        });

        htmlBuilder("user_featured", html);
    })

getUserJobs(myAxios)
    .then(userJobs => {
        var html = "";

        //console.log(userJobs);

        userJobs.forEach(job => {

            let htmlSegment =
                `
                    <div id="${job.id}" class="card product-report">
                        <div class="header">
                            <h2>${job.post_title} <small>Posted: Date: ${job.date_created} || Time: ${job.time_created}</small></h2>
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="edit.html?id=${job.id}&type=j">Edit</a></li>
                                        <li><a id="delete_user_job" data-value="${job.id}">Delete</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <div class="row clearfix m-b-15">
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <p>Picture(s)</p>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <p>Map</p>
                                </div>
                            </div>
                            <div>
                                <p>
                                    ${job.post_content}
                                </p>
                            </div>
                        </div>
                    </div>
                `;



            html += htmlSegment;

        });

        htmlBuilder("user_job", html);

    });

getUserForSale(myAxios)

    .then(userPosts => {

        var html = "";

        //console.log(userPosts);

        userPosts.forEach(post => {

            let htmlSegment =
                `
                    <div id="${post.id}" class="card product-report">
                        <div class="header">
                            <h2>${post.post_title} <small>Posted: Date: ${post.date_created} time: ${post.time_created}</small></h2>
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="edit.html?id=${post.id}&type=s">Edit</a></li>
                                        <li><a class="delete_user_for_sale" data-value="${post.id}">Delete</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <div class="row clearfix m-b-15">
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <p>could have pictures in here</p>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <p>could have location map similar to criagslists here</p>
                                </div>
                            </div>
                            <div>
                                <p>${post.post_content}</p>
                            </div>
                        </div>
                    </div>
                `;

            html += htmlSegment;

        });

        htmlBuilder("user_for_sale", html);

    });

// DELETE BUTTONS
document.querySelector('#user_featured').addEventListener('click', (event) => {
    console.log(event.target.closest('a').dataset.id);
})