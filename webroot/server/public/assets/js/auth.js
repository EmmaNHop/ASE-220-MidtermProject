import("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");

var users={};

async function createNewUser(username, password, email, number, birthday) {
    try{
        const response = await axios.post('http://localhost:3000/api/users/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            content:{
                username: username,
                password: password,
                email: email,
                number: number,
                birthday: birthday
            }
        }).then( function (response){
            console.log(response);
            window.location.replace('./login.html');
        });
    } catch (error){
        console.log(error);
        console.log(response);
    }
}

async function authenticate(email, password) {
    try{
        const response = await axios.post('http://localhost:3000/api/users/signin', {
            headers: {
                'Content-Type': 'application/json'
            },
            content:{
                email: email,
                password: password
            }
            
        }).then( function (response){
            /*
             *  !RESPONSE FORMAT!
             *  JSON
             * 
             *  token: 'string',
             *  expires: int,
             *  user{
             *      email: 'string',
             *      id: 'string'
             *  }
             */


            // Handle Successful login
            console.log(response);
            if(response.status === 200){
                return response.data;
            }
        });
        console.log(response);
        return response;

    }
    catch(error){
        // Reloads page when clicking okay on the reload to force a user credentials re-entry
        if(alert(error.response.status === 401)){}
        else {window.location.reload(); }
        console.log(error)
    }
    return false;
}

async function checkLoginStatus(){

    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    if(!token){
        // TODO: add UNAUTH-ED ERROR
    }

    try{
        const response = await axios.post('http://localhost:3000/api/users/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // TODO: Handle response
        return response;
    } catch(error){
        // TODO: Login Error
        console.log(error);
    }

}