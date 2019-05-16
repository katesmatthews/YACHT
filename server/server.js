/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const app = express();

mongoose.connect('mongodb+srv://kate:s0ins3cur3@cluster0-btilm.mongodb.net/YACHT?retryWrites=true', { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('/supersecretuserdata', userController.test);

app.post('/addportfolio', userController.portfolioAdd);

app.post('/login', userController.verifyUser);

app.post('/signup', userController.createUser);


app.listen(3000, () => console.log('Listening on port 3000...'));
