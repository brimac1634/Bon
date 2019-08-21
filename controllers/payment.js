const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handlePayment = (req, res) => {
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
}

module.exports = {
	handlePayment
}