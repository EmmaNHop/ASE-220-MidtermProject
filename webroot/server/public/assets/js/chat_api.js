/* 
*
*           API URLS    
*      
*/


/*          GET METHODS         */

async function getChatById(Axios, id){
    try{
        console.log(id);

        let post = await Axios.get(`http://localhost:3000/api/chats/chat/${id}`, {}, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        return await post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

async function getUsersChats(Axios, id){
    try{
        let post = await Axios.get(`http://localhost:3000/api/chats/${id}`, {}, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        return await post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

