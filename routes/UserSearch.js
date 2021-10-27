module.exports = (app, db) => {
	app.get('/search/user', (req, res) => {
		res.render('usersearch', { error: false });
	});
};
