'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);


userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  console.log(this.password);
  next();
});

//userSchema.methods.hashPassword
userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  jwt.sign({_id: this._id}, 'CHANGE ME') ;
};

let User = mongoose.model('User', userSchema);
module.exports = User;