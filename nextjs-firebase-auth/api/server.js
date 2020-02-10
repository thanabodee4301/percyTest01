const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./firebase');
const callback = require('./callback');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/firebase', admin);
app.use('/callback', callback.callback);

app.listen(3001, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:3001`);
});