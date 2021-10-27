module.exports = (app, db) => {
	app.get('/u', (req, res) => {
		if (!req.query.user || !req.query.word || !req.query.page)
			return res
				.status(404)
				.send("Query 'user' or 'word' or 'page' is not found");
		db.execute('SELECT * FROM `words` WHERE `bywho` = ? AND `word` = ?', [
			req.query.user,
			req.query.word,
		])
			.then(([rows]) => {
				if (!rows.length) {
					return res.status(404).send({ error: 'word not found' });
				}
				let pg_next = parseInt(req.query.page) + 1,
					pg_prev = parseInt(req.query.page) - 1,
					row = rows[req.query.page - 1];
				pg_prev <= 0 ? (pg_prev = 1) : (pg_prev = pg_prev),
					pg_next > rows.length
						? (pg_next = req.query.page)
						: (pg_next = pg_next);
				let orgUrl = req.originalUrl.toString();
				let url = orgUrl.split('&');
				url.splice(-1, 1);
				let linking = url.join('&');
				res.render('meaning', {
					word: row.word,
					meaning: row.meaning,
					example: row.example,
					id: row.id,
					bywho: row.bywho,
					pg_now: parseInt(req.query.page),
					pg_next: pg_next,
					pg_prev: pg_prev,
					url: linking,
				});
			})
			.catch((e) => {
				return res.send(e.toString());
			});
	});
};
