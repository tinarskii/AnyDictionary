module.exports = (app, db) => {
	app.get('/api/v1/getAllWords', (req, res) => {
		db.execute('SELECT * FROM `words`').then(([rows]) => {
			res.send(rows);
		});
	});
};
