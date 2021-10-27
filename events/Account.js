module.exports = (app, db) => {
	app.get('/account', (req, res) => {
		if (!req.session.userId) return res.redirect('/login');
		db.execute('SELECT `avatar` FROM `userinfo` WHERE `id` = ?', [
			req.session.userId,
		]).then(([rows]) => {
			return res.render('account', {
				username: req.session.userUsername,
				useravatar: rows[0].avatar,
			});
		});
	});
};
