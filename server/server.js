/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('../controllers/user-controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('/supersecretuserdata', userController.test);

app.listen(3000, () => console.log('Listening on port 3000...'));
