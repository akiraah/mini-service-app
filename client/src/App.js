import React from 'react';
import PostCreate from './component/PostCreate';
import PostList from './component/PostList'

const App = (props) => {
  return (
    <div className="container">
      <h1>Create Post!!!</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
