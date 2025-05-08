const userId = sessionStorage.getItem('id');

function htmlBuilder(query, html) {
    const container = document.getElementById(query);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error(`Element #${query} not found`);
    }
}

async function getUserFeatured(Axios, userId) {
    try {
        const response = await Axios.get(`http://localhost:3000/api/posts/user/featured/${userId}`, {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            }
        });
        const posts = response.data;

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
                    <div id="${featured._id}" class="card product-report">
                        <div class="header">
                            <h2>${featured.post_title} <small>Posted: ${featured.date_created}</small></h2>
                            <ul class="header-dropdown">
                                <li><a href="edit.html?id=${featured._id}">Edit</a></li>
                                <li><a class="delete_user_featured" data-value="${featured._id}">Delete</a></li>
                            </ul>
                        </div>
                        <div class="body">
                            <p>${featured.post_content}</p>
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
                <div id="${job._id}" class="card product-report">
                    <div class="header">
                        <h2>${job.post_title} <small>Posted: ${job.date_created}</small></h2>
                        <ul class="header-dropdown">
                            <li><a href="edit.html?id=${job._id}">Edit</a></li>
                            <li><a class="delete_user_job" data-value="${job._id}">Delete</a></li>
                        </ul>
                    </div>
                    <div class="body">
                        <p>${job.post_content}</p>
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
                <div id="${post._id}" class="card product-report">
                    <div class="header">
                        <h2>${post.post_title} <small>Posted: ${post.date_created}</small></h2>
                        <ul class="header-dropdown">
                            <li><a href="edit.html?id=${post._id}">Edit</a></li>
                            <li><a class="delete_user_for_sale" data-value="${post._id}">Delete</a></li>
                        </ul>
                    </div>
                    <div class="body">
                        <p>${post.post_content}</p>
                    </div>
                </div>`;
            html += htmlSegment;
        });
        htmlBuilder("user_for_sale", html);
    });
}
// DELETE BUTTONS
document.querySelector('#user_featured').addEventListener('click', (event) => {
    console.log(event.target.closest('a').dataset._id);
})

document.querySelector('#user_featured').addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete_user_featured');
    if (deleteButton) {
        const postId = deleteButton.dataset.value;
        console.log(`Delete post with ID: ${postId}`);
        // Add delete logic here
    }
});
