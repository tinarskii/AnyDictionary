module.exports = (app, db) => {
	app.get('/api/v1/search/:word/:rows/:key', (req, res) => {
		db.execute(
			`SELECT \`${req.params.key}\` FROM \`words\` WHERE \`word\` = ?`,
			[`${req.params.word}`]
		)
			.then(([rows]) => {
				return res.send(rows[req.params.rows ? req.params.rows - 1 : 0]);
			})
			.catch((e) => {
				return res.status(404).send({
					error: `NOT FOUND`,
				});
			});
	});
};
