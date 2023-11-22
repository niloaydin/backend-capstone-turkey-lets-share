const passport = require('passport');

const User = require('../models/user');

const { generateUniqeUsername } = require('../services/utils');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const USER = await User.findById(id);
  done(null, USER);
});


module.exports = {
  passport,
};
