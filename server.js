const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const https = require('https');
const { updateRecentMedia } = require('./firebase/firebase.utils.js');

setInterval(function() {
    https.get('https://bon-vivant.herokuapp.com/');
}, 1000000);

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')))

	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

const gallery = require('./controllers/gallery');
const scheduleGetMedia = () => setTimeout(()=>{
	gallery.getRecentMedia();
	scheduleGetMedia();
}, 6000000)
scheduleGetMedia();

app.listen(port, error => {
	if (error) throw error;
	console.log('server running on port ' + port)
})

app.get('/get-gallery', (req, res) => { gallery.getGallery(res)})

app.post('/payment', (req, res) => {
	const { token, amount } = req.body;
	const body = {
		source: token.id,
		amount: amount,
		currency: 'hkd'
	};
	stripe.charges.create(body, (stripeErr, stripeRes) =>{
		if (stripeErr) {
			res.status(500).send({ error: stripeErr })
		} else {
			res.status(200).send({ success: stripeRes })
		}
	})
})

app.post('/contact-us', (req, res) => {
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

    
})








