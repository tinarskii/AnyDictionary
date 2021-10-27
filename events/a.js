module.exports = (app, login) => {
	app.get('/a', (req, res) => {
		if (!req.query.username)
			return res.status(404).send("Query 'username' is not found");
		if (req.query.username === req.session.userUsername)
			return res.redirect('/account');
		login
			.execute('SELECT * FROM `userinfo` WHERE `name` = ?', [
				req.query.username,
			])
			.then(([rows]) => {
				if (!rows.length) {
					return res.status(404).send({ error: 'user not found' });
				}
				res.render('user', {
					username: rows[0].name,
					useravatar: rows[0].avatar,
				});
			})
			.catch((e) => {
				return res.send(e.toString());
			});
	});
};
