// app_server/controllers/travel.js
const fs = require('fs');
const path = require('path');

var trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
    travel
}