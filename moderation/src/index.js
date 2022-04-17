const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const { data, type } = req.body;
  console.log({ service: "Moderation"})
  if (type === 'CommentCreated') {
    const { content, id, postId } = data;
    // check whether it contains string "orange" for the status
    console.log("content", content)
    const status = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
    res.send({})
  }
});

app.listen(4003, () => {
  console.log('listening on port 4003');
});
