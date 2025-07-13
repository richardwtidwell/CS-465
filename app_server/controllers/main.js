// Serve the landing page
module.exports.index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
};