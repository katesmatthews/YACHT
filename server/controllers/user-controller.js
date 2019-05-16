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
  delete req.body.coinList;
  delete req.body.newsData;
  // console.log('req.body in portfolio add is', req.body);

  User.findOneAndUpdate({ username: req.body.username }, { portfolio: req.body },
    (err, result) => {
      if (err) {
        console.log('err in update: ', err);
        return res.send(err);
      }
      console.log('successful update: ', result);
      return res.json(result);
    });
};

userController.getPortfolio = (req, res, next) => {
  User.findOne({ username: req.body.username })
  const portfolio = {};
  res.json(portfolio)
};

module.exports = userController;
