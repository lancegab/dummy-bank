const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const consolidate = require('consolidate');
const passport = require('./config/passport');
const database = require('./database');
const User = require('./models').User;
const Account = require('./models').Account;

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');

app.use(bodyparser.urlencoded({
	extended: true
}));

app.use(cookieparser('secret-cookie'));
app.use(session({ resave: false, saveUninitialized: false, secret: 'secret-cookie' }));
app.use(flash());
app.use(passport.initialize());

app.use('/static', express.static('./static'));
app.use(require('./auth-routes'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/signup', function(req, res){
	const name = req.body.name;
	console.log(req.body);
});

app.get('/profile', requireSignedIn, function(req, res) {
	const email = req.session.currentUser;
	User.findOne({ where: { email: email } }).then(function(user) {
		res.render('profile.html', {
			user: user
		});
	});
});

//transfer
app.post('/transfer', requireSignedIn, retrieveSignedInUser, function(req, res) {
	const recipient = req.body.recipient;
	const amount = parseInt(req.body.amount, 10);
	const sender = req.user;
//	const email = req.session.currentUser;
//	User.findOne({ where: { email: email } }).then(function(sender) {
		User.findOne({ where: { email: recipient } }).then(function(receiver) {
			Account.findOne({ where: { user_id: sender.id } }).then(function(senderAccount) {
				Account.findOne({ where: { user_id: receiver.id } }).then(function(receiverAccount) {
					database.transaction(function(t) {
						return senderAccount.update({
							balance: senderAccount.balance - amount
						}, { transaction: t }).then(function() {
							return receiverAccount.update({
								balance: receiverAccount.balance + amount
							}, { transaction: t });
						});
					}).then(function() {
						req.flash('statusMessage', 'Transferred ' + amount + ' to ' + recipient);
						res.redirect('/profile');
					});
				});
			});
		});
//	});
});

//deposit
app.post('/deposit', requireSignedIn, retrieveSignedInUser, function(req, res) {
	const amount = parseInt(req.body.depositamount, 10);
	//const email = req.session.currentUser;

	const user = req.user;

	/*	User.findOne({ where: { email: email } }).then(function(user) {
				Account.findOne({ where: { user_id: user.id } }).then(function(acct) {
					database.transaction(function(t) {
						return acct.update({
							balance: acct.balance + amount
						}, { transaction: t }).then(function() {
							req.flash('statusMessage', 'Deposited ' + amount + ' to ' + user.id);
							res.redirect('/profile');
					});
				});
			});
		});*/

	//	User.findOne({ where: { email: email } }).then(function(user) {
				Account.findOne({ where: { user_id: user.id } }).then(function(acct) {
					database.transaction(function(t) {
						return acct.update({
							balance: acct.balance + amount
						}, { transaction: t }).then(function() {
							req.flash('statusMessage', 'Deposited ' + amount + ' to ' + user.id);
							res.redirect('/profile');
					});
				});
			});
	//	});
});

//withdraw
app.post('/withdraw', requireSignedIn, retrieveSignedInUser, function(req, res) {
	const amount = parseInt(req.body.withdrawamount, 10);
	const email = req.session.currentUser;
	const user	= req.user;

//		User.findOne({ where: { email: email } }).then(function(user) {
				Account.findOne({ where: { user_id: user.id } }).then(function(acct) {
					database.transaction(function(t) {
						return acct.update({
							balance: acct.balance - amount
						}, { transaction: t }).then(function() {
							req.flash('statusMessage', 'Withdrawn ' + amount + ' to ' + user.id);
							res.redirect('/profile');
					});
				});
			});
//		});
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/'
    }),
    function(req, res) {
        req.session.currentUser = req.user.email;
        res.redirect('/profile');
    }
);

function requireSignedIn(req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    next();
}

function retrieveSignedInUser(req, res, next) {

		req.user = req.session.user;

    next();
}

app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});
