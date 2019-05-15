/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../models/user-model.js');

exports.test = (req, res) => {
  mongoose.connect('mongodb+srv://kate:s0ins3cur3@cluster0-btilm.mongodb.net/YACHT?retryWrites=true'); 
  // mongoose.connect('mongodb+srv://yachtreadwrite:s0ins3cur3@cluster0-btilm.mongodb.net/test?retryWrites=true'); 
  mongoose.connection.once('open', (err, result) => {
    if (err) console.log('error in connecting, ', err);
    else console.log('Connected to db, yay');
  });

  const newUser = new User({username: 'k8', password: 'badpassword'});
  newUser.save((err, result) => {
    if (err) console.log('save() error is ', err);
    else console.log('save() result is ', result);
  });

  User.find({}, (err, result) => {
    if (err) console.log('error in finding, ', err);
    else {
      console.log('Found records, yay: ', result);
      res.json(result);
    }
  });
};