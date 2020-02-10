import React, { Component } from 'react';
import Layout from '../../components/layout';
import Menu from '../../components/menu';
import { auth, firebase } from '../../src/firebase'
import axios from 'axios';

class LineAuth extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
            photo:'',
            displayname: ''
        };
        this.name = '';
        this.profile = '';
        this.initPage();
        this.signinLine = this.signinLine.bind(this);
        this.logoutLine = this.logoutLine.bind(this);
        this.signinWithCustomToken = this.signinWithCustomToken.bind(this);
    }
    
    componentDidMount(){
        const current = this;
        const urlParams = new URLSearchParams(window.location.search);
        this.name = urlParams.get('name');
        this.profile = urlParams.get('profile');
        if(this.name != null){
            axios.post('http://localhost:3001/firebase/createcustomtoken', {
                name: this.name
            })
            .then(function (response) {
                console.log(response);
                current.signinWithCustomToken(response.data, current.name, current.profile);
                current.state.token = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    initPage(){
        firebase.auth().onAuthStateChanged((user) => {
            console.log('user :::', user);
            if(user){
                this.setState({
                    ... this.state,
                    photo: user.photoURL,
                    displayname: user.displayName
                });
            }
        });
    }
    
    signinWithCustomToken(token, name, profile){
        const current = this;
        firebase.auth().signInWithCustomToken(token).then(function(result) {
            result.user.updateProfile({
                displayName: name,
                photoURL: profile
            });
            // current.setState({
            //     ... current.state,
            //     photo: current.profile,
            //     displayname: current.name
            // });
            window.location.href = 'http://localhost:3000/line';
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

    signinLine(){
        const current = this;
        window.location.href= 'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653765753&redirect_uri=http://localhost:3001/callback&state=12345abcde&scope=openid%20profile%20email';
    }

    logoutLine(){
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
                <h1>Firebase Line Auth</h1>
                <div>{this.state.displayname}</div>
                <div>
                    {this.state.photo != '' && (
                        <img src={this.state.photo} width="100" height="100"></img>
                    )}
                </div>
                <div>
                {this.state.displayname =='' && (
                    <button id="signin" name="signin" onClick={this.signinLine}>Sign In</button>
                )}
                    <button id="logout" name="logout" onClick={this.logoutLine}>Log out</button>
                </div>
            </Layout>
            </>
        );
    }
}
  
export default LineAuth