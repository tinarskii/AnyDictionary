module.exports = (app, db, ifNotLoggedin, ifLoggedin) => {
	app.post('/addWord', ifNotLoggedin, (req, res) => {
		if (!req.body.word || !req.body.meaning || !req.body.example) {
			return res.render('add', { name: req.body.bywho, success: false });
		}
		db.execute('SELECT * FROM `words` WHERE `word` = ? AND `bywho` = ?', [
			req.body.word,
			req.body.bywho,
		]).then(([rows]) => {
			if (!rows.length) {
				db.execute(
					'INSERT INTO `words`(`word`, `meaning`, `example`,`bywho`) VALUES (?,?,?,?)',
					[
						req.body.word,
						req.body.meaning,
						req.body.example,
						req.session.userUsername,
					]
				).then(() => {
					res.render('add', { name: req.body.bywho, success: true });
				});
			}
			let i = 0;
			do {
				if (
					rows[i].meaning == req.body.meaning ||
					rows[i].example == req.body.example
				) {
					return res.render('error', {
						errmsg: 'This meaning or example is already defined by you.',
						status: 400,
					});
				} else if (
					rows[i].meaning != req.body.meaning ||
					(rows[i].example != req.body.example && i == rows.length)
				) {
					db.execute(
						'INSERT INTO `words`(`word`, `meaning`, `example`,`bywho`) VALUES (?,?,?,?)',
						[
							req.body.word,
							req.body.meaning,
							req.body.example,
							req.session.userUsername,
						]
					).then(() => {
						res.render('add', { name: req.body.bywho, success: true });
					});
					return;
				}
				i++;
			} while (i < rows.length);
		});
	});
};
