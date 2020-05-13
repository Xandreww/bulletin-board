const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['openid'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/user/no-permission' }),
  (req, res) => {
    res.redirect('http://localhost:3000/user/logged');
  },
);

module.exports = router;
