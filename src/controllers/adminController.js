const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new User({ username, password, role: 'admin' });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username, role: 'admin' });
    
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const assignment = await Assignment.findOneAndUpdate(
      { _id: id, adminId: req.user._id },
      { status },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
