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
        let post = await Axios.get(`http://localhost:3000/api/chats/${id}`, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        return await post;
    }catch(error){
        console.error('Error getting featured post by ID. \n    ' + error);
    }
}

async function createChat(Axios, chatInfo){
    try{
        console.log("chat created: ", chatInfo)
        let post = await Axios.post(`http://localhost:3000/api/chats/newChat`, {
            content : {
                userA_id : chatInfo.userA_id,
                userB_id : chatInfo.userB_id,
                userA_name : chatInfo.userA_name,
                userB_name : chatInfo.userB_name,
                //will set initial message
                messages : [{
                    content : chatInfo.content,
                    sender_name : chatInfo.userA_name,
                    sender_id : chatInfo.userA_id
                }]
            }
        },
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        return await post;
    }catch(error){
        console.error('Error creating chat. \n    ' + error);
    }
}

async function sendMessage(Axios, messageInfo){
    try{
        console.log("HELLO ", messageInfo);
        let post = await Axios.put(`http://localhost:3000/api/chats/${messageInfo.chatId}`, {
            content : {
                chat_id : messageInfo.chatId, 
                messages : [{
                    content : messageInfo.content,
                    sender_name : messageInfo.sender_name,
                    sender_id : messageInfo.sender_id,
                    time : messageInfo.time
                }]
            }
        }, 
        {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
        });

        return await post;
    }catch(error){
        console.error('Error sending message. \n    ' + error);
    }
}


