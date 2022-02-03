//import { Domain } from '@material-ui/icons'; //imports icon 
import React, { useContext, useState, useEffect } from 'react'; //importing hooks
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase'; //importing the auth obj from firebase.js

const AuthContext = React.createContext(); //create AuthContext
export const useAuth = () => useContext(AuthContext); //AuthContext is passed into useContext React hook

export const AuthProvider = ({ children }) => {
    const [loading, setLoding] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => { //this will be called when the new use is added or renavigate the page
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoding(false);

            if (user)
                history.push('/chats');
        })
    }, [user, history]);

    const value = { user };
    return ( 
    <AuthContext.Provider value = { value } > 
        {!loading && children } 
    </AuthContext.Provider>
    )

}