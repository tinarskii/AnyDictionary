module.exports = (app, login) => {
	app.get('/follower', (req, res) => {
		login
			.execute('SELECT * FROM userinfo WHERE id = ?', [req.session.userId])
			.then(([rows]) => {
				if (!rows[0].follower) {
					return res.render('follower', { follower: 'No one follow you 😢' });
				} else {
					return res.render('follower', {
						follower: rows[0].follower.split(',').filter((x) => x),
					});
				}
			});
	});
};
