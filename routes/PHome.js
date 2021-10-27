module.exports = (app, db) => {
	app.post('/', (req, res) => {
		res.render('home', { error: false });
	});
};
