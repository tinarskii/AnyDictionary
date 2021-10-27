module.exports = (app, db) => {
	app.get('/logoutUser', (req, res) => {
		req.session = null;
		res.redirect('/');
	});
};
