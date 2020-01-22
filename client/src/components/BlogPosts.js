import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/posts')
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, [setPosts]);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <Post key={post.id} title={post.title} contents={post.contents} />
      ))}
    </div>
  );
};

export default BlogPosts;
