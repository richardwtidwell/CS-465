const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

// Ensure the User model is registered with mongoose
require("../models/user");
const User = mongoose.model("users");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            try {
                const q = await User.findOne({ email: username }).exec();
                if (!q) {
                    return done(null, false, {
                        message: "Incorrect username.",
                    });
                }
                if (!q.validPassword || !q.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
                return done(null, q);
            } catch (err) {
                return done(err);
            }
        }
    )
);

