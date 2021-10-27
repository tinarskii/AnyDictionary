module.exports = (app, db) => {
	app.post('/search', (req, res) => {
		const term = [`%${req.body.terms}%`];
		!req.body.terms ? res.render('home', { error: true }) : null;
		db.execute('SELECT * FROM `words` WHERE `word` LIKE ?', term)
			.then(([rows]) => {
				!rows.length ? res.render('home', { error: 'NRTF' }) : null;
				const arr = [];
				JSON.parse(JSON.stringify(rows)).forEach((row) => {
					arr.push(row.word);
				});
				res.redirect(
					'/w' +
						'?word=' +
						rows[0].word +
						'&page=' +
						arr.indexOf(rows[0].word) +
						1
				);
			})
			.catch((e) => {
				console.log(e);
			});
	});
};
