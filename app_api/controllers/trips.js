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
    tripsFindByCode
};