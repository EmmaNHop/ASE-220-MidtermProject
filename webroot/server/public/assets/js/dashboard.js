const userId = sessionStorage.getItem('id');

function htmlBuilder(query, html) {
    const container = document.getElementById(query);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error(`Element #${query} not found`);
    }
}

async function getUserFeatured(Axios) {
    try {
        const response = await Axios.get(`http://localhost:3000/api/posts/user/featured/${userId}`, {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            }
        });
        const posts = response.data;

        console.log(response);

        if (!Array.isArray(posts)) {
            console.error("Unexpected response format:", posts);
        }
        return posts;
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}


async function getUserJobs(Axios){
    try {
        const response = await Axios.get(`http://localhost:3000/api/posts/user/jobs/${userId}`);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}


async function getUserForSale(Axios){
    try {
        const response = await Axios.get(`http://localhost:3000/api/posts/user/for_sale/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}

function loadPage (Axios) {
    // Fetch and render user featured posts
    getUserFeatured(Axios).then(userFeatured => {
        let html = "";
        if (Array.isArray(userFeatured)) {
            userFeatured.forEach(featured => {
                let htmlSegment = `
                    <div id="${featured._id}" class="card-item p-2  m-2" >
                        <div class="" style="color:white">
                            <h4>${featured.post_title}</h4>
                            <img src="${featured.img}" alt="Job Image" class="img-responsive"/>
                        </div>
                        <div class="header" style="color:white">
                            <p style="color:white">${featured.post_content} <small>Posted: ${featured.date_created}</small></p>
                            <div class="card-button">
                                <a href="edit.html?id=${featured._id}" class="edit mr-1 edit-link">Edit</a>
                                <a class="delete_user_featured " data-value="${featured._id}" class="ml-1" style="color: black;">Delete</a>
                            </div>
                        </div>
                    
                    </div>`;
                html += htmlSegment;
            });
        }
        htmlBuilder("user_featured", html);
    });

    // Fetch and render user jobs
    getUserJobs(Axios).then(userJobs => {
        let html = "";
        userJobs.forEach(job => {
            let htmlSegment = `
                <div id="${job._id}" class="card-item p-2  m-2" >
                    <div class="" style="color:white">
                        <h4>${job.post_title}</h4>
                        <img src="${job.img}" alt="Job Image" class="img-responsive"/>
                    </div>
                    <div class="header" style="color:white">
                        <p style="color:white">${job.post_content} <small>Posted: ${job.date_created}</small></p>
                        <div class="card-button">
                            <a href="edit.html?id=${job._id}" class="edit mr-1 edit-link">Edit</a>
                            <a class="delete_user_job " data-value="${job._id}" class="ml-1" style="color: black;">Delete</a>
                        </div>
                    </div>
                    
                </div>`;
            html += htmlSegment;
        });
        htmlBuilder("user_job", html);
    });

    // Fetch and render user posts for sale
    getUserForSale(Axios).then(userPosts => {
        let html = "";
        userPosts.forEach(post => {
            let htmlSegment = `
                <div id="${post._id}" class="card-item p-2  m-2" >
                    <div class="" style="color:white">
                        <h4>${post.post_title}</h4>
                        <img src="${post.img}" alt="Job Image" class="img-responsive"/>
                    </div>
                    <div class="header" style="color:white">
                        <p style="color:white">${post.post_content} <small>Posted: ${post.date_created}</small></p>
                        <div class="card-button">
                            <a href="edit.html?id=${post._id}" class="edit mr-1 edit-link">Edit</a>
                            <a class="delete_user_for_sale " data-value="${post._id}" class="ml-1" style="color: black;">Delete</a>
                        </div>
                    </div>
                    
                </div>                `;
            html += htmlSegment;
        });
        htmlBuilder("user_for_sale", html);
    });
}