import("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");

var storage_URL = 'https://jsonblob.com/api/jsonBlob/1342157028830928896';
var users=["EMPTY"];

function createNewUser(username, password, email, number, birthday) {
    axios.get(storage_URL, {})
    .then(function (response) {
        console.log(response.data);
        console.log(username + " " + password + " " + email + " " + number + " " + birthday);
        users=response.data.users;

        let temp = [username, password, email, number, birthday];

        users.push(temp);

        axios.put(storage_URL, {
            users
        })
        .then(function (response) {
            console.log(response);
            window.location.replace("login.html");
        })
        .catch(function (error) {
            console.log(error);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function authenticate(username, password) {

    try{

        const response = await axios.get(storage_URL, {})

        var authError="";
        for(let i=0; i<response.data.users.length;i++) {
            if(username == response.data.users[i][0]) {
                if(password == response.data.users[i][1]) {
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
        // Reloads page when clicking okay on the reload to force a user credentials re-entry
        if(alert(authError)){}
        else {window.location.reload(); }
    }
    catch{
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
