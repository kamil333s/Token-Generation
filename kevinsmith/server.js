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
  var newUser = new User({name:'BOB', password:'noway'});
  newUser.save((err, user) => {
    res.json(user);
  });
});

app.get('/setup/verify', (req, res) => {
  User.find({}, (err, list) => {
    res.json(list);
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


