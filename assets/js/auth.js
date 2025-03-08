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
        })
        .catch(function (error) {
            console.log(error);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

function authenticate(username, password) {
    axios.get(storage_URL, {})
    .then(function (response) {
        var authError="";
        for(let i=0; i<response.data.users.length;i++) {
            if(username == response.data.users[i][0]) {
                if(password == response.data.users[i][1]) {
                    window.location.replace("dashboard.html");
                    return;
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
}

