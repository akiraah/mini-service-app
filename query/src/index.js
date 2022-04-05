const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (data, type) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { data, type } = req.body;
  handleEvent(data, type);
  res.send({});
});

app.listen(4002, async () => {
  console.log('listening on 4002');
  try {
    const response = await axios.get("http://localhost:4005/events")
    console.log("response from bus")
    console.log(response.data)

    for (let event of response.data){
      console.log('Handling type: ' + event.type);
      handleEvent(event.data, event.type)
    }
  } catch (e) {
    console.error(e)
  }
});
