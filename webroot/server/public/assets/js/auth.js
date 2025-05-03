import("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");

//var storage_URL = 'http://localhost:3000/api/users/signup';
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
                password: password,
            }
        }).then( function (response){
            /*
             *  !RESPONSE FORMAT!
             *  JSON
             * 
             *  token: '123',
             *  user{
             *      email: 'e@mail.com',
             *      id: 'id123'
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


/*
    var isUser = false;
    axios.get(storage_URL, {})
    .then(function (response) {
        var authError="";
        for(let i=0; i<response.data.users.length;i++) {
            if(username == response.data.users[i][0]) {
                if(password == response.data.users[i][1]) {

                    // Keeps the user stored in local storage
                    localStorage.setItem('username', username);
                    //window.location.replace("dashboard.html");
                    isUser = true;
                    return true;
                }
                else {
                    authError="password is incorrect";
                }
            }
        }
        if(authError.length==0) {
            authError="account not found";
        }
            alert(authError);
    })
    .catch(function (error) {
        console.log(error);
    });
    return isUser;
}
*/
