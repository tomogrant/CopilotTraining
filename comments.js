// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comments);
    }
  });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});

// Post new comment
app.post('/comments', (req, res) => {
  const comment = new Comment({