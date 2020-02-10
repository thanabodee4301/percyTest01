import React, { Component } from 'react';
import Layout from '../../components/layout';
import Menu from '../../components/menu';
import { auth, firebase } from '../../src/firebase'
import style from './email.less';

class EmailAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
            isLogin: false,
            isVerifyClick: false,
            isResetPassword: false
        };
        this.initPage();
        this.signinEmail = this.signinEmail.bind(this);
        this.logoutEmail = this.logoutEmail.bind(this);
        this.signinUp = this.signinUp.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.sendmailVerify = this.sendmailVerify.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.sendmailResetPassword = this.sendmailResetPassword.bind(this);
    } 

    initPage(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    ... this.state,
                    email: user.email,
                    isLogin: true
                });
            }
        });
    }
    
    signinEmail(){
        const email = this.state.email;
        const password = this.state.password;
        if(email.length < 4){
            alert('Please Enter Your Email !');
            return;
        }
        if(password.length < 4){
            alert('Please Enter Your Password !');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                alert('The password is wrong.');
            }else{
                alert(errorMessage);
            }
            console.log(error);
        });
    }

    logoutEmail(){
        firebase.auth().signOut();
        this.setState({
            ... this.state,
            email: '',
            password: '',
            isLogin: false,
            isVerifyClick: false,
            isResetPassword: false
        });
    }
    
    signinUp(){
        const email = this.state.email;
        const password = this.state.password;
        if(email.length < 4){
            alert('Please Enter Your Email !');
            return;
        }
        if(password.length < 4){
            alert('Please Enter Your Password !');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/weak-password'){
                alert('The password is too weak.');
            }else{
                alert(errorMessage);
            }
            console.log(error);
        });
    }
    
    verifyEmail(){
        this.setState({
            ...this.state,
            isVerifyClick: true
        });
    }
    
    sendmailVerify(){
        firebase.auth().currentUser.sendEmailVerification().then(()=>{
            alert('Email Verification Sent !!');
            this.setState({
                ...this.state,
                isVerifyClick: false
            });
        });
    }

    resetPassword(){
        this.setState({
            ...this.state,
            isResetPassword: true
        });
    }

    sendmailResetPassword(){
        const email = this.state.email;
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
            alert('Password Reset Email Sent!');
            this.setState({
                ...this.state,
                isResetPassword: false
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/invalid-email'){
                alert(errorMessage);
            }else if(errorCode == 'auth/user-not-found'){
                alert(errorMessage);
            }
            // console.log(error);
        });
    }

    setEmailState(e){
        const { value } = e.target;
        this.setState({
            ... this.state,
            email: value
        });
    }
    
    setPasswordState(e){
        const { value } = e.target;
        this.setState({
            ... this.state,
            password: value
        });
    }

    render(){
        return (
            <>
            <Menu />
            <Layout>
                <h1>Firebase Email Auth</h1>
                {this.state.isLogin && !this.state.isVerifyClick && (<b>{this.state.email}</b>)}

                {(!this.state.isLogin || this.state.isVerifyClick || this.state.isResetPassword) && (
                    <div className={style.less}>
                        <input type="text" id="email" value={this.state.email} onChange={(e) => { this.setEmailState(e); }}></input>
                    </div>
                )}
                {!this.state.isLogin && !this.state.isResetPassword && (
                    <div className={style.formemailauth}>
                        <input type="password" id="password" value={this.state.password} onChange={(e) => { this.setPasswordState(e); }}></input>
                    </div>
                )}
                <div>
                {(!this.state.isLogin && !this.state.isVerifyClick) && (
                    <>
                    <button id="signin" name="signin" onClick={this.signinEmail}>Sign In</button>
                    <button id="signup" name="signup" onClick={this.signinUp}>Sign Up</button>
                    <button id="resetpassword" name="resetpassword" onClick={this.resetPassword}>Reset Password</button>
                    </>
                )}
                {(this.state.isVerifyClick) && (
                    <button id="sendmail" name="sendmail" onClick={this.sendmailVerify}>Sendmail</button>
                )}
                {(this.state.isResetPassword) && (
                    <button id="sendmail" name="sendmail" onClick={this.sendmailResetPassword}>Sendmail</button>
                )}
                {this.state.isLogin && (
                    <>
                    {!this.state.isVerifyClick && (
                        <button id="verify" name="verify" onClick={this.verifyEmail}>Verify</button>
                    )}
                    <button id="logout" name="logout" onClick={this.logoutEmail}>Log out</button>
                    </>
                )}
                </div>
            </Layout>
            </>
        );
    }
}
  
export default EmailAuth