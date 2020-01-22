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

  db.findPostComments(id)
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

/***** POST *****/

// When the client makes a POST request to /api/posts:

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  const post = req.body;

  title && contents
    ? db
        .insert(post)
        .then(post => {
          res.status(201).json({ ...post, title, contents });
        })
        .catch(err => {
          res.status(500).json({
            error: 'There was an error while saving the post to the database',
            err
          });
        })
    : res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
});

// When the client makes a POST request to /api/posts/:id/comments:

router.post('/:id/comments', (req, res) => {
  const { text } = req.body;
  const comment = req.body;
  comment.post_id = req.params.id;

  !text
    ? res.status(400).json({
        errorMessage: 'Please provide text for the comment.'
      })
    : db.findById(comment.post_id).then(post => {
        post.length > 0
          ? db
              .insertComment(comment)
              .then(id => {
                res.status(201).json({ message: 'Comment created', id });
              })
              .catch(err => {
                res.status(500).json({
                  error:
                    'There was an error while saving the comment to the database',
                  err
                });
              })
          : res.status(404).json({
              message: 'The post with the specified ID does not exist.'
            });
      });
});

/***** DELETE *****/

// When the client makes a DELETE request to /api/posts/:id:

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      deleted
        ? res.status(200).json(`${deleted} record deleted`)
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed', err });
    });
});

/***** PUT *****/

// When the client makes a PUT request to /api/posts/:id:

module.exports = router;
