module.exports = (app, login) => {
	app.get('/follow', (req, res) => {
		if (!req.query.user)
			return res.render('error', {
				errmsg: "Query 'user' is not found.",
				status: 400,
			});
		login
			.execute('SELECT `follower` FROM `userinfo` WHERE `name` = ?', [
				req.query.user,
			])
			.then(([rows]) => {
				if (rows[0].follower.includes(req.session.userUsername))
					return res.render('error', {
						errmsg: 'Already follow that user!',
						status: 400,
					});
				login.execute(
					'UPDATE userinfo SET follower=CONCAT(follower,?) WHERE name=?',
					[req.session.userUsername + ',', req.query.user]
				);
				login.execute(
					'UPDATE userinfo SET following=CONCAT(following,?) WHERE name=?',
					[req.query.user + ',', req.session.userUsername]
				);
				res.redirect('/a?username=' + req.query.user);
			});
	});
};
