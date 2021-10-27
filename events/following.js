module.exports = (app, login) => {
	app.get('/following', (req, res) => {
		login
			.execute('SELECT * FROM userinfo WHERE id = ?', [req.session.userId])
			.then(([rows]) => {
				if (!rows[0].following) {
					return res.render('following', {
						following: "You don't follow anyone 😢",
					});
				} else {
					return res.render('following', {
						following: rows[0].following.split(',').filter((x) => x),
					});
				}
			});
	});
};
