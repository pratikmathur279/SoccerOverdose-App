import axios from 'axios';

class Actions {
    getForums(callback){
        axios(`https://zdlgr9pel3.execute-api.us-east-1.amazonaws.com/dev/forums`)
        .then((res) => {
            var data = res.data;
            callback(data)
        })
    }

    getChatMessages(id, callback){
        axios(`https://zdlgr9pel3.execute-api.us-east-1.amazonaws.com/dev/chatMessages/${id}`)
        .then((res) => {
            var data = res.data;
            data.sort((a, b) => (a.date < b.date) ? 1 : -1);
            callback(data)
        })
    }

    sendMessage(messagePackage, callback){
        axios.post(`https://zdlgr9pel3.execute-api.us-east-1.amazonaws.com/dev/chatMessages`, messagePackage)
        .then((res) => {
            var data = res.data;
            callback(data)
        })
    }

    createUser(userData, callback){
        console.log("here");
        axios.post('https://zdlgr9pel3.execute-api.us-east-1.amazonaws.com/dev/users', userData)
        .then((res)=>{
            callback(res);
        });
    }

    checkUserAuth(user, callback){
        axios(`https://zdlgr9pel3.execute-api.us-east-1.amazonaws.com/dev/login/${user}`)
        .then((res)=>{
            callback(res.data);
        });
    }
}

export default Actions;