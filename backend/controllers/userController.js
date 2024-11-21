const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Import the Mongoose User model

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Generate token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ username: decoded.username }).select('-password'); // Exclude password field
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { signup, login, getCurrentUser };
