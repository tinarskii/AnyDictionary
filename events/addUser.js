const bcrypt = require('bcrypt');
const { avatar } = require('../avatar.json');
module.exports = (app, login) => {
	app.post('/addUser', (req, res) => {
		if (!req.body.name || !req.body.pass)
			return res.render('error', {
				errmsg: 'Username or Password is blank',
				status: 400,
			});
		bcrypt.hash(req.body.pass, 12).then((hash) => {
			login
				.query('SELECT name FROM userinfo WHERE name = ?', [req.body.name])
				.then(([rows]) => {
					if (!rows.length) {
						login.query(
							'INSERT INTO userinfo(name, pass,avatar) VALUES (?,?,?)',
							[req.body.name, hash, avatar]
						);
						return res.render('register', { success: true });
					} else if (rows.length) {
						return res.render('error', {
							errmsg: 'This user is already exists, try another username',
							status: 400,
						});
					}
				});
		});
	});
};
