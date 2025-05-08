const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('id');

const myAxios = axios.create({}, {
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

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
        const response = await Axios.get(`http://localhost:3000/api/posts/user_posts/${userId}`, {}, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
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
        const response = await Axios.get(`http://localhost:3000/api/posts/user-jobs/${userId}`);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
    }
}


async function getUserForSale(Axios){
    try {
        const response = await Axios.get(`http://localhost:3000/api/posts/user_posts_for_sale/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user featured posts:", error);
        throw error;
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
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and render user featured posts
    getUserFeatured(myAxios).then(userFeatured => {
        let html = "";
        if (Array.isArray(userFeatured)) {
            userFeatured.forEach(featured => {
                let htmlSegment = `
                    <div id="${featured.id}" class="card product-report">
                        <div class="header">
                            <h2>${featured.post_title} <small>Posted: ${featured.date_created}</small></h2>
                            <ul class="header-dropdown">
                                <li><a href="edit.html?id=${featured.id}">Edit</a></li>
                                <li><a class="delete_user_featured" data-value="${featured.id}">Delete</a></li>
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
    getUserJobs(myAxios).then(userJobs => {
        let html = "";
        userJobs.forEach(job => {
            let htmlSegment = `
                <div id="${job.id}" class="card product-report">
                    <div class="header">
                        <h2>${job.post_title} <small>Posted: ${job.date_created}</small></h2>
                        <ul class="header-dropdown">
                            <li><a href="edit.html?id=${job.id}">Edit</a></li>
                            <li><a class="delete_user_job" data-value="${job.id}">Delete</a></li>
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
    getUserForSale(myAxios).then(userPosts => {
        let html = "";
        userPosts.forEach(post => {
            let htmlSegment = `
                <div id="${post.id}" class="card product-report">
                    <div class="header">
                        <h2>${post.post_title} <small>Posted: ${post.date_created}</small></h2>
                        <ul class="header-dropdown">
                            <li><a href="edit.html?id=${post.id}">Edit</a></li>
                            <li><a class="delete_user_for_sale" data-value="${post.id}">Delete</a></li>
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
});
// DELETE BUTTONS
document.querySelector('#user_featured').addEventListener('click', (event) => {
    console.log(event.target.closest('a').dataset.id);
})

document.querySelector('#user_featured').addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete_user_featured');
    if (deleteButton) {
        const postId = deleteButton.dataset.value;
        console.log(`Delete post with ID: ${postId}`);
        // Add delete logic here
    }
});
