const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// Middleware to authenticate bearer JWTs
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) { return res.sendStatus(401); }

  const parts = authHeader.split(' ');
  if (parts.length < 2)   { return res.sendStatus(501); }

  const token = parts[1];
  if (!token)             { return res.sendStatus(401); }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) { return res.status(401).json('Token Validation Error!'); }
    req.auth = verified; // decoded payload
    return next();
  });
}

router.route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router.route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode);

// Get Trip by ID
router.route('/trips/id/:tripId')
  .get(tripsController.tripsFindById);

// Update Trip (protected)
router.route('/trips/:tripId')
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Authentication
router.route('/register')
  .post(authController.register);

// Login
router.route('/login')
  .post(authController.login);


module.exports = router;
