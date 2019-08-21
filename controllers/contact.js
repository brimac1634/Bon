

const handleContact = (req, res) => {
	const { fullName, email, subject, message } = req.body;

	nodemailer.createTestAccount()
		.then(({ user, pass}) => {
			return nodemailer.createTransport({
		        service: 'gmail',
		        auth: {
		            user: 'brimac1634@gmail.com',
		            pass: 'Roxycat1634'
		        }
		    });
		}).then(transporter => {
			transporter.sendMail({
		        from: '"Fred Foo" <foo@example.com>',
		        to: 'bmacpherson@netroadshow.com',
		        subject: 'Hello',
		        text: 'Hello world?',
		        html: '<b>Hello world?</b>'
		    });
		}).then(result => {
			console.log(result)
			res.status(200).send(result)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({ err })
		})
}

module.exports = {
	handleContact
}