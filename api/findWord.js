module.exports = (app, db) => {
	app.get('/api/v1/search/:word', (req, res) => {
		db.execute('SELECT * FROM `words` WHERE `word` LIKE ?', [
			`%${req.params.word}%`,
		]).then(([rows]) => {
			if (!rows.length) {
				return res.status(404).send({ error: 'word not found' });
			}
			if (!req.query.p) {
				res.send({
					words: rows,
				});
			} else if (req.query.p) {
				res.send({
					words: rows[req.query.p - 1],
				});
			}
		});
	});
};
