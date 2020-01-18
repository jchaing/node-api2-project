const express = require('express');
const postsRouter = require('./router/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
  res.send(`
    <h1>Lambda POSTS API</h1>
    <p>Welcome to the Lambda POSTS API</p>
  `)
})

module.exports = server;
