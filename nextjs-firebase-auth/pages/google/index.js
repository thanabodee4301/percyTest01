import React, { Component } from 'react';
import Layout from '../../components/layout';
import Menu from '../../components/menu';
import { auth, firebase } from '../../src/firebase'

class GoogleAuth extends Component {

    constructor() {
        super();
        let provider = new firebase.auth.GoogleAuthProvider();
        this.state = {
            provider: provider,
            photo:'',
            displayname: ''
        };
        this.initPage();
        this.signinGoogle = this.signinGoogle.bind(this);
        this.logoutGoogle = this.logoutGoogle.bind(this);
    }
    
        
    initPage(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    ... this.state,
                    photo: user.photoURL,
                    displayname: user.displayName
                });
            }
        });
    }
    
    
    signinGoogle(){
        const current = this;
        firebase.auth().signInWithPopup(this.state.provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            current.setState({
                ... current.state,
                photo: result.user.photoURL,
                displayname: result.user.displayName
            });
        }).catch(function(error) {
        // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
        });
    }

    logoutGoogle(){
        const current = this;
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            current.setState({
                ... current.state,
                photo: '',
                displayname: ''
            });
            console.log('Sign-out successful.');
        }).catch(function(error) {
        // An error happened.
            console.log(error);
        });
    }

    render(){
        return (
            <>
            <Menu />
            <Layout>
                <h1>Firebase Google Auth</h1>
                <div>{this.state.displayname}</div>
                <div>
                {this.state.photo != '' && (
                    <img src={this.state.photo} width="100" height="100"></img>
                )}
                </div>
                <div>
                {this.state.displayname =='' && (
                    <button id="signin" name="signin" onClick={this.signinGoogle}>Sign In</button>
                )}
                    <button id="logout" name="logout" onClick={this.logoutGoogle}>Log out</button>
                </div>
            </Layout>
            </>
        );
    }
}
  
export default GoogleAuth