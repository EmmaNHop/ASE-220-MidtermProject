import("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");

async function createNewUser(username, password, email, number, birthday) {
    try {
        const response = await axios.post('http://localhost:3000/api/users/signup',
            {
                content: {
                    username: username,
                    password: password,
                    email: email,
                    number: number,
                    birthday: birthday
                }
            },
        );

        // Redirect after successful signup
        window.location.replace('./login.html');

    } catch (error) {
        console.error('Signup failed:', error);
    }
}

async function getExpFromToken(){
    const token = sessionStorage.getItem('token');

    const decoded = JSON.parse(atob(token.split('.')[1]));
    
    const exp = decoded.exp * 1000; // Convert to milliseconds

    sessionStorage.setItem('token_exp', exp);
}

// Check token experation to see if it is about to expire so the user can get a new one
async function checkTokenExp(){

    if(sessionStorage.length > 0){
        const twoMin = 2 * 60 * 1000; // In milliseconds
        if (sessionStorage.getItem('token_exp') - Date.now() < twoMin || sessionStorage.getItem('token_exp') === null){
            const response = await reauthenticate();
            if(response == false){
                alert("Error reauthenticating token");
                sessionStorage.clear();
                return false;
            }
            return true;
        }
        return false;
    } else{
        sessionStorage.clear();
        alert("Naughty Naughty - You didn't have a token!");
    }
    // TODO: Throw error or something
}

async function authenticate(email, password) {
    try{
        const response = await axios.post('http://localhost:3000/api/users/signin', {
            content:{
                email: email,
                password: password
            }
            
        }).then(function (response){
            /*
             *  !RESPONSE FORMAT!
             *  JSON
             * 
             *  token: 'string',
             *  user{
             *      email: 'string',
             *      username: 'string',
             *      id: 'string'
             *  }
             */
            console.log(response);
            if(response.status === 200){

                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('email', response.data.user.email);
				sessionStorage.setItem('username', response.data.user.username)
				sessionStorage.setItem('id', response.data.user.id);

                getExpFromToken();

                return response.data;
            }
        });

        return response;
    }
    catch(error){
        // Reloads page when clicking okay on the reload to force a user credentials re-entry
        if(error.status === 401){
            alert("Credentials Invalid!");
        }
        else {
            console.log(error);
        }
    }
    return false;
}

async function reauthenticate(){
    try{
        const response = await axios.post('http://localhost:3000/api/users/reauth', {}, {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            }
        });
        console.log(response.data);
        if(response.status === 200){

            sessionStorage.clear();

            sessionStorage.setItem('token', response.data.returnObj.token);
            sessionStorage.setItem('email', response.data.returnObj.user.email);
			sessionStorage.setItem('username', response.data.returnObj.user.username)
			sessionStorage.setItem('id', response.data.returnObj.user.id);

            // Decode token to get Exp time
            getExpFromToken();

            return true;
        }
        else{
            return false;
        }
    } catch(error){
        console.log(error)
    }
}

async function logout(token) {
    try{
        const response = await axios.post('http://localhost:3000/api/users/signout', {},{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response){
            if(response.status === 200){
                sessionStorage.clear();
                localStorage.clear();
                return true;
            }
        });
        if(response === true){
            return true;
        }
    } catch(error){
        //alert(error);
    }
}

async function checkToken(token){
    try{
        const response = await axios.post('http://localhost:3000/api/users/reauth', {}, {
            headers: {
                'Authorization':'Bearer ' + token
            }
        }).then(response => {
            if(response.status === 200){
                return true;
            }
        });
        if(response === true){
            return true;
        }
        sessionStorage.clear();
        localStorage.clear();

        return false;
    } catch(error){
        sessionStorage.clear();
        localStorage.clear();
        alert('Your token has expired: \n', error);
        console.error('Your token has expired: \n', error);
    }
}

async function checkUserStatus() {
    if(sessionStorage.length < 1){

        // Redundant ik but just in case
        sessionStorage.clear();
        localStorage.clear();

        if(!document.URL.includes("login.html")){
            window.location.replace('./login.html');
        }
        return false;
    }
    else if(sessionStorage.getItem('token') !== null){

        const expired = await checkTokenExp();

        // If the token is expired, it will have created a new one and will not need to auth here
        if(expired){
            var isLoggedIn = checkToken(sessionStorage.getItem('token'));
        }
        else if(!expired){
            var isLoggedIn = true;
        }
        else{
            // Uh Oh, should not reach this point
            alert("ERROR: Something went wrong with checking the user status!!!!");
        }

        if(isLoggedIn === true){
            return true;
        }

        if(!document.URL.includes("login.html")){
            window.location.replace('./login.html');
        }
        return false;
    }

}