const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/post/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  const comment = { id: commentId, postId: id, content, status: 'pending' };
  comments.push(comment);
  commentsByPostId[id] = comments;

  await axios.post('http://bus-srv:4005/events', {
    type: 'CommentCreated',
    data: comment,
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { data, type } = req.body;
  console.log('Received event', type);
  if (type === 'CommentModerated') {
    const { id, content, postId, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post('http://bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('listening on port 4001');
});
