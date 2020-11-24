const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, cb) => {
    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      image: profile.photos[0].value
    }

    try {
      let user = await User.findOne({googleId: profile.id});

      if(user){
        cb(null, user);
      }else {
        let user = await User.create(newUser);
        cb(null, user);
      }
    } catch (err) {
      console.log(err);
    }
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}