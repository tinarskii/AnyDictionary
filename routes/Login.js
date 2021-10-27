module.exports = (app, db, ifNotLoggedin, ifLoggedIn) => {
	app.get('/login', ifLoggedIn, (req, res) => {
		res.render('login', { error: false, success: 'no' });
	});
};
