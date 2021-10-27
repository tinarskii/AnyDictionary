let express = require('express'),
	app = express(),
	fs = require('fs'),
	port = process.env.PORT || 80,
	db = require('./database/db'),
	cookieSession = require('cookie-session'),
	login = require('./database/login');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(
	cookieSession({
		name: 'session',
		keys: ['key1', 'key2'],
	})
);

const ifNotLoggedin = (req, res, next) => {
	if (!req.session.LoggedIn) {
		return res.render('login', { error: false, success: 'no' });
	}
	next();
};
const ifLoggedin = (req, res, next) => {
	if (req.session.LoggedIn) {
		return res.redirect('/account');
	}
	next();
};

fs.readdirSync(__dirname + '/api').forEach((file) => {
	require(`./api/${file}`)(app, db, ifNotLoggedin, ifLoggedin);
});

fs.readdirSync(__dirname + '/routes').forEach((file) => {
	require(`./routes/${file}`)(app, db, ifNotLoggedin, ifLoggedin);
});

fs.readdirSync(__dirname + '/events').forEach((file) => {
	require(`./events/${file}`)(app, login);
});

app.listen(port, () => {
	console.log(`App is running... on port ${port}`);
});
