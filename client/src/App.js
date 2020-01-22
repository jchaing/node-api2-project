import React from 'react';
import BlogPosts from '../src/components/BlogPosts'
import { Container } from 'reactstrap'
import './App.css';

function App() {
  return (
    <Container>
      <h1 className="d-flex justify-content-center mb-5">Blog</h1>
      <BlogPosts />
    </Container>
  );
}

export default App;
