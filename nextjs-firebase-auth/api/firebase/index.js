const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

const serviceAccount = require("./auth-c9e92-firebase-adminsdk-3f6zm-d1d4736787.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

router.post('/createcustomtoken', (req, res) => {
    let userId = `line:${req.body.name}`;
    let additionalClaims = {
        premiumAccount: true
    };

    admin.auth().createCustomToken(userId, additionalClaims)
    .then(function(customToken) {
        res.send(customToken);
    })
    .catch(function(error) {
        console.log('Error creating custom token:', error);
        res.send(401);
    });
});

module.exports = router;