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


module.exports = {
    tripsList,
    tripsFindByCode,
    // POST: /trips – create a new trip (protected)
    tripsAddTrip: async (req, res) => {
        try {
            const body = req.body || {};
            const trip = new Model({
                code: body.code,
                name: body.name,
                length: body.length,
                start: body.start,
                resort: body.resort,
                perPerson: body.perPerson,
                image: body.image,
                description: body.description
            });
            const saved = await trip.save();
            return res.status(201).json(saved);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    // PUT: /trips/:tripId – update an existing trip (protected)
    tripsUpdateTrip: async (req, res) => {
        const { tripId } = req.params || {};
        if (!tripId) {
            return res.status(400).json({ message: 'tripId parameter required' });
        }
        try {
            const updates = req.body || {};
            const updated = await Model.findByIdAndUpdate(tripId, updates, { new: true }).exec();
            if (!updated) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
};
