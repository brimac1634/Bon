const jwt = require('jsonwebtoken');
const { 
	ServerError, 
	NameNotProvided,
	ValidationError,
	PasswordTokenExpired,
	EmailNotRegistered, 
	UserNotFound,
	RegistrationIncomplete
} = require('../errorCodes');
const SECRET = process.env.JWT_SECRET;

const validateEmail = (email) => {
	const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regexp.test(email);
}

const validatePassword = (password) => {
	return password.length >= 6;
}

const generateAuthToken = (res, user) => {
	const { email, id, name } = user;
	const token = jwt.sign({
			user: {
				userEmail: email,
				userID: id,
				userName: name 
			}
		},
        SECRET,
        {expiresIn: '7d'}
    );
    res.send({
        success: true,
        message: 'Authentication successful!',
        token: token,
        user
    });
}

const handleLogin = (req, res, db, bcrypt) => {
	let { email, password } = req.body;
	email = email.toLowerCase()
	const emailIsValid = validateEmail(email);
	const passwordIsValid = validatePassword(password);
	if (!emailIsValid || !passwordIsValid) {
		return res.send(new ValidationError())
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			if (data[0]) {
				if (data[0].hash === 'unverified') {
					throw new RegistrationIncomplete()
				} else {
					const isValid = bcrypt.compareSync(password, data[0].hash)
					if (isValid) {
						return db.select('*').from('users')
							.where('email', '=', email)
							.then(userData => {
						        generateAuthToken(res, userData[0])
							})
							.catch(err => {
								console.log(err)
								res.send(new ServerError())
							})
					} else {
						throw new ValidationError()
					}
				}
			} else {
				throw new EmailNotRegistered()
			}
		})
		.catch(err => {
			const error = err.isCustom ? err : new ServerError()
			res.send(error)
		})
}



const handleRegister = (req, res, db, bcrypt) => {
	let { name, email, password } = req.body;
	email = email.toLowerCase()
	const emailIsValid = validateEmail(email);
	const passwordIsValid = validatePassword(password);
	if (!emailIsValid || !passwordIsValid) {
		return res.send(new ValidationError())
	}

	db.select('email').from('login')
		.where('email', '=', email)
		.then(data => {
			const hash = bcrypt.hashSync(password);
			if (data[0]) {
				// user is changing password
				const user = data[0];
				db.transaction(trx => {
					trx.select('*').from('login')
					.where('email', '=', user.email)
					.update({hash: hash})
					.returning('email')
					.then(email => {
						return trx.select('*').from('users')
						.where('email', '=', email[0])
						.returning('*')
						.then(userData => {
							generateAuthToken(res, userData[0])
						})
						.catch(() => {
							res.send(new ServerError())
						})
					})
					.then(trx.commit)
					.catch(trx.rollback)
				})
			} else {
				if (name) {
					db.transaction(trx => {
						trx.insert({ hash, email })
						.into('login')
						.returning('email')
						.then(loginEmail => {
							return trx('users')
							.returning('*')
							.insert({
								name: name,
								email: loginEmail[0],
								joined: new Date()
							})
							.then(userData => {
								res.send('user created')
							})
							.catch(() => {
								res.send(new ServerError())
							})
						})
						.then(trx.commit)
						.catch(trx.rollback)
					})
				} else {
					throw new NameNotProvided()
				}
			}
		})
		.catch(err => {
			console.log(err)
			const error = err.isCustom ? err : new ServerError()
			res.send(error)
		})
}

const deleteAccount = (req, res, db) => {
	const { userEmail } = req.body;
	db.select('email', 'hash').from('login')
		.where('email', '=', userEmail)
		.then(data => {
			if (data[0].email) {
				db.transaction(trx => {
					return trx.select('*').from('login')
					.where('email', userEmail)
					.returning('email')
					.del()
					.then(email => {
						return trx.select('*').from('users')
						.where('email', email[0])
						.returning('id')
						.del()
						.then(userID => {
							res.send('user deleted')
						})
						.catch(() => {
							res.send(new ServerError())
						})
					})
					.then(trx.commit)
					.catch(trx.rollback)
				})
			} else {
				throw new EmailNotRegistered()
			}
		})
		.catch(err => {
			const error = err.isCustom ? err : new ServerError()
			res.send(error)
		})
}

const checkUser = (req, res, db) => {
	const { user, user: { userEmail } } = req.decoded
	db.select('email').from('users')
		.where('email', '=', userEmail)
		.then(data => {
			if (data[0]) {
				res.send(user)
			} else {
				//user no longer exists
				throw new UserNotFound()
			}
		})
		.catch(err => {
			const error = err.isCustom ? err : new ServerError()
			res.send(error)
		})

	
}



module.exports = {
	handleLogin,
	handleRegister,
	deleteAccount,
	checkUser
}