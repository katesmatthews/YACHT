/* eslint-disable no-console */
// const mongoose = require('mongoose');
const User = require('../models/user-model.js');

const userController = {};

userController.test = (req, res) => {
  // mongoose.connect('mongodb+srv://kate:s0ins3cur3@cluster0-btilm.mongodb.net/YACHT?retryWrites=true'); 
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

userController.createUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, result) => {
    if (err) return res.json(err)
    console.log('successful usersave: ', result);
    return res.redirect('/');
  });
};

userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) return res.json(err);
    if (!result) return res.send('user doesn\'t exist');
    if (req.body.password === result.password) return res.send('validated');
    return res.send('invalid credentials');
  });
};

userController.portfolioAdd = (req, res, next) => {
  const selectedCoin = req.body.selectedcoin;
  const coinQty = req.body.coinqty;
  const portfolio = {};
  portfolio[selectedCoin] = {
    qty: coinQty,
    display: true,
  };
  
  console.log('portfolio is: ', portfolio);
  // res.json(portfolio);
  return res.redirect('/');
};

module.exports = userController;
