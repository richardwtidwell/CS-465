const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    const q  = await Model.find({}).exec();

    if(!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - return a single trip (as array with one doc) matching code
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ 'code': req.params.tripCode }).exec(); // selection parameter
        if(!q || q.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

// POST: /trips – Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();

        if (!q) {
            // Database returned no data
            return res.status(400).json({ message: 'Unable to create trip' });
        } else {
            // Return new trip
            return res.status(201).json(q);
        }
        // console.log(q); // Uncomment to show results of operation on the console
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode – Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    try {
        // Uncomment for debugging
        // console.log(req.params);
        // console.log(req.body);

        const q = await Model.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec();

        if (!q) {
            // Database returned no data
            return res.status(400).json({ message: 'Unable to update trip' });
        } else {
            // Return resulting updated trip
            return res.status(201).json(q);
        }
        // console.log(q); // Uncomment to show results of operation on the console
    } catch (err) {
        return res.status(400).json(err);
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};