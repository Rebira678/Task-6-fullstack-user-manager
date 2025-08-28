const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

exports.register = async (req, res, next) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: parsed.email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = new User(parsed);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'verysecret', { expiresIn: '7d' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

exports.login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'verysecret', { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};
