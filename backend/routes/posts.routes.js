const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts.controller');

router.get('/posts', PostController.getPartPosts);
router.get('/postsFull', PostController.getFullPosts);
router.get('/posts/:id', PostController.getId);
router.post('/posts', PostController.add);
router.put('/posts/:id', PostController.edit);

module.exports = router;
