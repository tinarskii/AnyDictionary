module.exports = (app, db, ifNotLoggedin, ifLoggedin) => {
	app.get('/register', ifLoggedin, (req, res) => {
		res.render('register', { success: null });
	});
};
