const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = user =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    const token = generateToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ msg: 'User already exists or invalid data' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ msg: 'Logout successful (handled on client)' });
};
