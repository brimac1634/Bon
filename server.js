const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')))

	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

app.listen(port, error => {
	if (error) throw error;
	console.log('server running on port ' + port)
})

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









