module.exports = (app, db, ifNotLoggedin, ifLoggedin) => {
	app.get('/wordList', ifNotLoggedin, (req, res) => {
		db.execute('SELECT * FROM `words` WHERE `bywho` = ?', [
			req.session.userUsername,
		]).then(([rows]) => {
			if (!rows.length) {
				return res.render('wordList', {
					word: 'Oops! Nothing here.',
					user: req.session.userUsername,
					link: null,
				});
			}
			var words = [];
			for (var i = 0; i < rows.length; i++) {
				words.push(rows[i].word);
			}
			res.render('wordList', {
				word: [...new Set(words)],
				user: req.session.userUsername,
				link: `/u?user=${req.session.userUsername}`,
				username: req.session.userUsername,
			});
		});
	});
};
