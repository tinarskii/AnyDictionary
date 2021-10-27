const bcrypt = require('bcrypt');
var LocalStorage = require('node-localstorage').LocalStorage,
	localStorage = new LocalStorage('./scratch');

module.exports = (app, login) => {
	app.post('/loginUser', (req, res) => {
		if (!req.body.pass || !req.body.name)
			return res
				.status(400)
				.render('login', { success: 'no', error: 'noinfo' });
		login
			.execute('SELECT * FROM `userinfo` WHERE `name` = ?', [req.body.name])
			.then(([rows]) => {
				if (!rows.length) {
					return res.render('login', { success: false, error: false });
				}
				bcrypt.compare(req.body.pass, rows[0].PASS).then((compare_result) => {
					if (compare_result === true) {
						req.session.LoggedIn = true;
						req.session.userUsername = rows[0].name;
						req.session.userId = rows[0].id;
						localStorage.setItem('userAvatar', rows[0].avatar);
						res.render('login', { success: true, error: false });
					} else {
						return res.render('login', { success: false, error: false });
					}
				});
			});
	});
};
