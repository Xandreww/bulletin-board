const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts.controller');

router.get('/posts', PostController.getPosts);
router.get('/posts/:id', PostController.getId);
router.post('/posts', PostController.add);
router.put('/posts/:id', PostController.edit);

module.exports = router;
