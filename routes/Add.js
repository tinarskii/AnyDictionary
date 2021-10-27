const login = require('../database/login');

module.exports = (app, db, ifNotLoggedin) => {
	app.get('/add', ifNotLoggedin, (req, res) => {
		login
			.execute('SELECT `name` FROM `userinfo` WHERE `id`= ?', [
				req.session.userId,
			])
			.then(([rows]) => {
				res.render('add', {
					name: rows[0].name,
					success: null,
				});
			});
	});
};
