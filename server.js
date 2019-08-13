const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
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

app.get('/gallery', (req, res) => {
	const instaToken = process.env.INSTA_TOKEN;

	const getRecentMedia = async () => {
		try {
			const mediaIDs = await axios({
				url: `https://graph.facebook.com/v3.2/17841406842055532/media?access_token=${instaToken}`,
				method: 'get'
			})
			const { data } = mediaIDs.data;
			if (!data) return;
			const mediaPromises = data.map(async ({ id }) => {
				try {
					const response = await axios.get(`https://graph.facebook.com/v2.12/${id}?access_token=${instaToken}&fields=media_type,media_url,thumbnail_url,permalink,caption`)
					return response.data
				} catch (err) {
					console.log(err)
					res.status(500).send({err})
				}
			})
			const media = await Promise.all(mediaPromises)
			console.log(media)
			res.status(200).send({ data: media })
		} catch (err) {
			console.log(err)
			res.status(500).send({err})
		}
	}
	getRecentMedia()
})









