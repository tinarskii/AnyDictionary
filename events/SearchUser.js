module.exports = (app, db) => {
	app.post('/usersearch', (req, res) => {
		const term = [`%${req.body.terms}%`];
		!req.body.terms ? res.render('home', { error: true }) : null;
		db.execute('SELECT * FROM `userinfo` WHERE `name` LIKE ?', term)
			.then(([rows]) => {
				!rows.length ? res.render('usersearch', { error: 'NRTF' }) : null;
				res.redirect('/a' + '?username=' + rows[0].name);
			})
			.catch((e) => {
				console.log(e);
			});
	});
};
