module.exports = (app, db) => {
	app.get('/api', async (req, res) => {
		await res.render('api');
	});
};
