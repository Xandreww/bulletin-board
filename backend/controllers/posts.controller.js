const Post = require('../models/post.model');

const now = new Date();

exports.getPosts = async (req, res) => {
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
  try {
    const image = req.files.image;

    let fileName;
    if (!image) fileName = null;
    else fileName = image.path.split('/').slice(-1)[0];

    const newPost = new Post({ ...req.fields, date: now, updateDate: null, status: 'published', image: fileName });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.edit = async (req, res) => {
  try {
    const { title, price, content, email, telephone } = req.body;
    const image = req.files.image;

    let fileName;
    if (!image) fileName = null;
    else fileName = image.path.split('/').slice(-1)[0];

    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title;
      post.price = price;
      post.content = content;
      post.email = email;
      post.telephone = telephone;
      post.updateDate = now;
      if (fileName) {
        post.image = fileName;
      } else {
        return post.image;
      }

      await post.save();
      res.json(post);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
