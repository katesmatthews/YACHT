/* eslint-disable no-console */
// const mongoose = require('mongoose');
const User = require('../models/user-model');

const userController = {};

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
    if (req.body.password === result.password) {
      res.cookie('validated', 'true');
      res.cookie('username', req.body.username);
      return res.json('validated');
    }
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
  
  console.log('portfolio in portfolioAdd is: ', portfolio);
  res.json(portfolio);
};

userController.getPortfolio = (req, res, next) => {
  User.findOne({ username: req.body.username })
  const portfolio = {};
  res.json(portfolio)
};

module.exports = userController;
