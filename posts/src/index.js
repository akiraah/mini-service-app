const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/events', (req, res) => {
  console.log("Received event", req.body.type);
  res.send({})
});

app.post('/post', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  })
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
