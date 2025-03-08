var storage_URL = 'https://jsonblob.com/api/jsonBlob/1342157028830928896';
var names=["EMPTY"];

axios.get(storage_URL, {})
.then(function (response) {
    console.log(response.data);
    names=response.data.names;
    for(let i=0; i<response.data.names.length;i++) {
        let li=document.createElement('li');
        li.innerText=response.data.names[i];
        document.querySelector('ul').append(li);
    }
})
.catch(function (error) {
    console.log(error);
});


function add(x) {
    axios.get(storage_URL, {})
    .then(function (response) {
        console.log(response.data);
        names=response.data.names;
        names.push(x);
        axios.put(storage_URL, {
            names
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

