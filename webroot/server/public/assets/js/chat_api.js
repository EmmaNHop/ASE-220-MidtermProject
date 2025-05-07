/* 
*
*           API URLS    
*      
*/


/*          GET METHODS         */

async function getChatById(Axios, id){
    try{
        console.log(id);

        let post = await Axios.get(`http://localhost:3000/api/chats/chat/${id}`, {
            // TODO: handle response here
        });

        return post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

