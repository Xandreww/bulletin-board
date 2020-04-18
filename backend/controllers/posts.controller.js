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
  try {
    const { title, price, content, email, telephone, userId } = req.fields;
    const image = req.files.file;

    let fileName;
    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    if (title && price && content && email) {
      const newPost = new Post({
        ...req.fields,
        image: fileName,
        date: generateDate,
        updateDate: null,
        status: 'published',
        userId,
      });
      console.log(image);

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

    let fileName;
    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title;
      post.price = price;
      post.content = content;
      post.email = email;
      post.telephone = telephone;
      post.updateDate = generateDate;
      if (fileName) {
        post.image = fileName;
      } else {
        return post.image;
      }

      await post.save();
      res.json(post);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
