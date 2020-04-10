const datePicker = require('date-and-time');
const Post = require('../models/post.model');

const now = new Date();
const generateDate = datePicker.format(now, 'DD.MM.YYYY');

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
    const { title, price, content, email, telephone } = req.body;

    if (title && price && content && email) {
      const newPost = new Post({ title, price, content, email, telephone, date: generateDate, updateDate: null, status: 'published' });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.edit = async (req, res) => {
  try {
    const { title, price, content, email, telephone } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title;
      post.price = price;
      post.content = content;
      post.email = email;
      post.telephone = telephone;
      post.updateDate = generateDate;

      await post.save();
      res.json(post);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
