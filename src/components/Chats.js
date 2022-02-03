import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import {useAuth} from '../contexts/AuthContext'
const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }
    const getFile= async(url)=>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhotot.jpg", {type: 'image/jpeg'})
    }
    useEffect(()=> {
        if(!user){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "37eade04-5def-492b-91ce-3e2705c9db96",
                "user-name": user.email, 
                "user-secret":user.uid,
            }
        })
        .then(()=>{
             setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers:{"private-key":"35177481-1c4c-45aa-9054-33ef530a753d"}}
                )
                .then(()=>setLoading(false))
                .catch((error)=>console.log(error))
            })
        })
    },[user, history])

    if(!user||loading) return 'Loading...';
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ChatApp  
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>  
            <ChatEngine
                    height="calc(100vh - 66px)"
                    projectID={"37eade04-5def-492b-91ce-3e2705c9db96"}
                    userName={user.email}
                    userSecret={user.uid}
                />  
        </div>
    )
}
export default Chats;
