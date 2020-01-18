const express = require('express');

const db = require('../data/db');

const router = express.Router();

/***** GET *****/

// When the client makes a GET request to /api/posts:
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.', err });
    });
});

// When the client makes a GET request to /api/posts/:id:

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      post.length > 0
        ? res.status(200).json(post)
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.', err });
    });
});

// When the client makes a GET request to /api/posts/:id/comments:

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  db.findCommentById(id)
    .then(comments => {
      comments.length > 0
        ? res.status(200).json(comments)
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res.status(500).json({
        error: 'The comments information could not be retrieved.',
        err
      });
    });
});

module.exports = router;
