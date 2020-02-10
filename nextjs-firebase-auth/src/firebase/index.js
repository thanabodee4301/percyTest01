import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const auth = firebase.auth();
export {
    auth,
    firebase
};