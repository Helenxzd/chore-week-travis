import React, {useState, useEffect} from 'react';
import SignIn from "./components/SignIn/SignIn";
import { Link } from 'react-router-dom';
import './App.css';
import firebase from "./shared/firebase";

function App() {
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            const elem = document.getElementById(user ? 'chores-link' : 'signin-link');
            if (elem) {
                setUser(user);
                elem.click();
            }
        });
    }, []);
    
    return (
        <div>
            <Link id="signin-link" style={{ display: 'none'}} to="/" />
            <Link id="chores-link" style={{ display: 'none'}} to="/chores" />
            <SignIn uid={user ? user.uid : null}/>
        </div>
    ); 
}

export default App;
