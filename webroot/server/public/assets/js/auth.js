import("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");


async function createNewUser(username, password, email, number, birthday) {
    try{
        const response = await axios.post('http://localhost:3000/api/users/signup', {
            content:{
                username: username,
                password: password,
                email: email,
                number: number,
                birthday: birthday
            }
        }).then(function (response){
            console.log(response);
            window.location.replace('./login.html');
        });
    } catch (error){
        console.log(error);
    }
}

async function getExpFromToken(){
    const decoded = JSON.parse(atob(token.split('.')[1]));
    
    const exp = decoded.exp * 1000; // Convert to milliseconds

    sessionStorage.setItem('token_exp', exp);
}

// Check token experation to see if it is about to expire so the user can get a new one
async function checkTokenExp(){
    if(sessionStorage.length > 0){
        const fiveMin = 5 * 60 * 1000; // In milliseconds
        if (sessionStorage.getItem('token_exp') - Date.now() < fiveMin){
            reauthenticate();
        }
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
            //window.location.reload();
        }
    }
    return false;
}

async function reauthenticate(){
    try{
        const response = axios.post('http://localhost:3000/api/users/reauth', {}, {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(function (response) {
            console.log(response);
            if(response.status === 200){

                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('email', response.user.email);
				sessionStorage.setItem('username', response.user.username)
				sessionStorage.setItem('id', response.user.id);

                // Decode token to get Exp time
                getExpFromToken();

                return;
            }

        });
    } catch(error){
        console.log(error);
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
                return true;
            }
        });

        if(response === true){
            return true;
        }
    } catch(error){
        alert(error);
    }
}
