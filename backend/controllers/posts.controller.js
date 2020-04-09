const Post = require('../models/post.model');

exports.getPartPosts = async (req, res) => {
  try {
    const result = await Post.find({ status: 'published' }).select('date title image price').sort({ date: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFullPosts = async (req, res) => {
  try {
    const result = await Post.find().sort({ date: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getId = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.add = async (req, res) => {
  // const photo = req.files.file;

  try {
    const { title, price, content, email, telephone } = req.fields;

    if (title && price && content && email) {
      const newPost = new Post({ title, price, content, email, telephone });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
