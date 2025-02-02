const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const constants = require('../lib/constants');
const { generateUniqeUsername } = require('../services/utils');

const register = async (req, res) => {
  const SECRET_KEY="DENEME"
  const errorsArray = [];
  const { firstName, lastName, email, phoneNumber, password0 } = req.body;

  try {
    const usedEmail = await UserModel.findOne({ email });
    if (usedEmail) {
      errorsArray.push('Email is already taken');
    }

    const usedPhone = await UserModel.findOne({ phoneNumber });
    if (usedPhone) {
      errorsArray.push('Phone number is already taken');
    }

    if (errorsArray.length > 0) {
      return res.status(400).json({ error: errorsArray });
    }

    const passwordHash = await bcrypt.hash(password0, 10);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      username: generateUniqeUsername(email),
      phoneNumber,
      provider: 'Local',
      providerId: 'Local',
      passwordHash,
    });

    const shownInfo = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      phoneNumber: newUser.phoneNumber,
    };

    return res.status(201).json(shownInfo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const SECRET_KEY="DENEME"
    const { usernameOrEmail, password } = req.body;
    if (constants.EMAIL_REGEX.test(usernameOrEmail)) {
      const foundEmail = await UserModel.findOne({ email: usernameOrEmail });

      if (!foundEmail) {
        return res.status(401).json({ message: 'Wrong email or password!' });
      }
      const validPassword = await bcrypt.compare(
        password,
        foundEmail.passwordHash
      );
      if (!validPassword) {
        return res.status(401).json({ message: 'Wrong email or password!' });
      }

      const payload = { userId: foundEmail.id };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: constants.TOKEN_EXPIRATION_DURATION,
      });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: constants.COOKIE_MAX_AGE, // 14 days
      });
      return res.status(201).json({ message: 'User successfully signed in!' });
    }

    const foundUsername = await UserModel.findOne({
      username: usernameOrEmail,
    });

    if (!foundUsername) {
      return res.status(401).json({ message: 'Wrong username or password!' });
    }
    const validPassword = await bcrypt.compare(
      password,
      foundUsername.passwordHash
    );
    if (!validPassword) {
      return res.status(401).json({ message: 'Wrong username or password!' });
    }

    const payload = { userId: foundUsername.id };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: constants.TOKEN_EXPIRATION_DURATION,
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: constants.COOKIE_MAX_AGE, // 14 days
    });
    return res.status(201).json({ message: 'User successfully signed in!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  await res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

const saveUserToTokenAndCookie = (req, res) => {
  try {
    const SECRET_KEY="DENEME"
    const { name, email, providerId, profilePicture } = req.user;
    const payload = {
      name,
      email,
      providerId,
      avatar: profilePicture,
      userId: req.user.id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: constants.TOKEN_EXPIRATION_DURATION,
    });
    res.cookie('token', token, {
      httpOnly: true,
      signed: true,
      maxAge: constants.COOKIE_MAX_AGE,
    });
    return res.redirect('/api/user/profile');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  saveUserToTokenAndCookie,
};
