const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { adminId, task } = req.body;
    const assignment = new Assignment({
      userId: req.user._id,
      adminId,
      task,
      file: req.file ? {
        filename: req.file.filename,
        path: req.file.path
      } : undefined
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, { password: 0 });
    res.json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
