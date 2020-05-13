const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const uniqid = require('uniqid');

const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

/* MIDDLEWARE */
// standard middleware
app.use(cors());
app.use(
  formidable({ uploadDir: './assets/images/' }, [
    {
      event: 'fileBegin', // on every file upload...
      action: (req, res, next, name, file) => {
        const fileName = uniqid() + '.' + file.name.split('.')[1];
        file.path = __dirname + '/assets/images/photo_' + fileName;
      },
    },
  ]),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '/assets/images/')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
const atlas = 'mongodb+srv://user-1:8PWfbjWF3QqIr8wc@cluster0-omz6c.mongodb.net/bulletinBoard?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || atlas, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', (err) => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
