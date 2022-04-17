import React from 'react';

const CommentList = ({ comments }) => (
  <ul>
    {comments.map((comment) => {
      if (comment.status !== 'rejected' && comment.status !== 'pending')
        return <li key={comment.id}>{comment.content}</li>;
      return <></>
    })}
  </ul>
);

export default CommentList;
