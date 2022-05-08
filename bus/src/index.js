const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
  console.log("event bus")
  const event = req.body;
  await axios.post('http://posts-cluster-srv:4000/events', event)
  await axios.post('http://comments-cluster-srv:4001/events', event)
  await axios.post('http://query-cluster-srv:4002/events', event)
  await axios.post('http://moderation-srv:4003/events', event)
  console.log(events);
  res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005.');
});
