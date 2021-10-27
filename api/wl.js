module.exports = (app, db) => {
	app.get('/wl', (req, res) => {
		if (!req.query.user)
			return res.status(404).send("Query 'user' is not found");
		db.execute('SELECT * FROM `words` WHERE `bywho` = ?', [
			req.query.user,
		]).then(([rows]) => {
			if (!rows.length) {
				return res.render('wordList', {
					word: 'Oops! Nothing here.',
					user: req.query.user,
					link: null,
				});
			}
			var words = [];
			for (var i = 0; i < rows.length; i++) {
				words.push(rows[i].word);
			}
			res.render('wordList', {
				word: [...new Set(words)],
				user: req.query.user,
				link: `/u?user=${req.query.user}`,
				username: req.query.user,
			});
		});
	});
};
