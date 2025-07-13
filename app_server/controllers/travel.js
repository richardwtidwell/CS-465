// Serve the travel page (static data for now)
module.exports.travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};