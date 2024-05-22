const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ token });
});

// Get user stickers
router.get('/stickers', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    res.json({ stickers: user.stickers });
});

// Update sticker status
router.post('/update-sticker', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { stickerId } = req.body;
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    user.stickers.set(stickerId, true);
    await user.save();
    res.json({ message: 'Sticker status updated' });
});

module.exports = router;
