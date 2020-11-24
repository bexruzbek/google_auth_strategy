const { Router } = require('express');
const { ensureAuth, ensureGuest } = require('../middlewares/auth');
const router = Router();

//@desc     Login page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

//@desc    Dashboard
//@route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    res.render('index', {
      name: req.user.name,
      image: req.user.image
    });
});

module.exports = router;