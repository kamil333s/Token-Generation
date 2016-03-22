'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let User = require('./models/user_model');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

let publicRouter = express.Router();
require('./routes/login')(publicRouter);
app.use(publicRouter);

app.post('/setup', (req, res) => {
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    res.json(user);
  });
});

app.get('/setup', (req, res) => {
  User.find({}, (err, list) => {
    res.json(list);
  });
});

app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { password: req.body.password }, (err, user) => {
    if (err) return res.send(err);
    console.log('Updated: ', user  );
    res.json(user);
  });
});

app.delete('/setup/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send(err);
    user.remove((err, user) => {
      res.json({'message': 'user removed'});
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on 3000');
});


