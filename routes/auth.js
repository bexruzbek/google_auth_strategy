const { Router } = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = Router();

//@desc     Auth with google
//@route    GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@desc    Dashboard
//@route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  try {
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err);
  }
});

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;