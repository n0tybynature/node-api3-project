const express = require('express');
const { validatePost, validateUser, validateUserId } = require('../middleware/middleware')
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json({users});
    })
    .catch(() => {
      res.status(500).json({
        message:"couldn't fetch users",
      })
    })
});

router.get('/:id', validateUserId ,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(500).json({
      message:"Couldn't post new user."
    })

});

router.put('/:id',validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.user.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch( err => {
      res.status(500).json(err);
    })

});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.delete(req.user.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(
      res.status(500).json({
        message:"Couldn't delete user"
      })
    )
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.user.id)
    .then(() => {
      res.status(200).json(posts)
    })
    .catch(
      res.status(500).json({
        message:"Couldn't fetch post",
      })
    )

});

router.post('/:id/posts',validateUserId ,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.insert({
    ...req.body,
    user_id: req.params.id
  })
  .then( post => {
    res.status(201).json(post)
  })
  .catch( err => {
    res.status(500).json( err )
  })
});

// do not forget to export the router
module.export = router;