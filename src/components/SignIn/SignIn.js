import React from 'react';
import firebase from '../../shared/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';
import '../../styles/SignIn.css';

const db = firebase.database().ref();

const SignInPage = () => {
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                // update user record in database whenever the user signs in
                db.child("users").child(`${result.user.uid}`)
                    .update({
                        displayName: result.user.displayName,
                        email: result.user.email
                    })
                    .catch(error => alert(error));
                return false;
            }
        }
    };

    const SignIn = () => (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );

    return (
        <div className="PositionWrap">
            <div className="SignInWrapper">
                <div className="AppName">ChoreWeek</div>
                <div className="LogoWrap">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <SignIn/>
            </div>
        </div>
    );
};

export default SignInPage;
