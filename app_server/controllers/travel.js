// app_server/controllers/travel.js
// Retrieve trips from the API instead of local JSON file

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: { Accept: 'application/json' }
};

const travel = async (req, res, next) => {
    try {
        const response = await fetch(tripsEndpoint, options);
        if (!response.ok) {
            return res.status(response.status).send(`API error: ${response.statusText}`);
        }
        let json = await response.json();
        let message = null;
        if (!Array.isArray(json)) {
            message = 'API lookup error';
            json = [];
        } else if (json.length === 0) {
            message = 'No trips exist in our database';
        }
        res.render('travel', { title: 'Travlr Getaways', trips: json, message });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { travel };