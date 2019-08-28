const nodemailer = require('nodemailer');
const {
	GMAIL_USER,
	GMAIL_CLIENT,
	GMAIL_CLIENT_SECRET,
	GMAIL_ACCESS_TOKEN,
	GMAIL_REFRESH_TOKEN
} = process.env;

const handleContact = (req, res) => {
	const { fullName, email, subject, message } = req.body;

	const transporter = nodemailer.createTransport({
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
	    auth: {
	        type: 'OAuth2',
	        user: GMAIL_USER,
	        clientId: GMAIL_CLIENT,
	        clientSecret: GMAIL_CLIENT_SECRET,
	        refreshToken: GMAIL_REFRESH_TOKEN,
	        accessToken: GMAIL_ACCESS_TOKEN
	    }
	});

	const mailOptions = {
		from: email,
		to: 'brimac1634@gmail.com',
		subject: 'Bon Vivant - Contact Us',
		text: `name: ${fullName} \nemail: ${email} \nsubject: ${subject} \n\n${message} \n\n\n\nThis message was sent from Bon Vivant website`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.status(500).send('unable to send message')
			console.log(error);
		} else {
			res.send('message sent')
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = {
	handleContact
}