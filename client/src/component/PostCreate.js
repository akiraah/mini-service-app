import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onClickPostButtonHandler = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/post', {
      title,
    });

    setTitle('');
  };

  const inputFieldHandler = (event) => setTitle(event.target.value);
  return (
    <div>
      <form onSubmit={onClickPostButtonHandler}>
        <div className="form-group">
          <label>Title</label>
          <input onChange={inputFieldHandler} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
