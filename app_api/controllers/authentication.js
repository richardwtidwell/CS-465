const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

// POST: /register – create a new user and return a JWT
const register = async (req, res) => {
    // Validate message to ensure that all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: 'All fields required' });
    }

    try {
        const user = new User({
            name: req.body.name, // Set User name
            email: req.body.email, // Set e-mail address
            password: '' // Start with empty password (hash/salt stored separately)
        });

        // Set user password (hash + salt on the model)
        if (typeof user.setPassword === 'function') {
            user.setPassword(req.body.password);
        }

        const q = await user.save();

        if (!q) {
            // Database returned no data
            return res.status(400).json({ message: 'Unable to save user' });
        } else {
            // Return new user token
            const token = typeof user.generateJWT === 'function' ? user.generateJWT() : null;
            return res.status(200).json(token);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    register,
    // POST: /login – authenticate a user and return a JWT
    login: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'All fields required' });
        }

        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(400).json(err);
            }
            if (!user) {
                // Wrong credentials
                return res.status(401).json(info || { message: 'Invalid credentials' });
            }

            // Successful login – return a signed JWT
            const token = typeof user.generateJWT === 'function' ? user.generateJWT() : null;
            return res.status(200).json(token);
        })(req, res);
    }
};

