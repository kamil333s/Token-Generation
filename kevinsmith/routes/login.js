'use strict';
// let jwt = require('jsonwebtoken');
let User = require('../models/user_model');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.headers.authorization);
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(method);
    console.log(name);
    console.log(password);
    // parse based on basic or whatever method
    User.find({name: name}, (err, user) => {
      console.log('user:', user[0]);
      console.log(User);
      let valid = user[0].compareHash(password);
      if (!valid) {
        return res.json({status: 'failure'});
      }
      // generate and return the token
      res.json({token: user.generateToken()});
    }) ;
    // res.json({method: method, name:name, password:password});
  });
};

























