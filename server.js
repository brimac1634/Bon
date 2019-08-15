const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const { updateRecentMedia } = require('./firebase/firebase.utils.js');

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

const scheduleGetMedia = setTimeout(()=>{
	getRecentMedia();
	scheduleGetMedia();
}, 6000000)

const getRecentMedia = () => {
	console.log('getting recent media')
	const instaToken = process.env.INSTA_TOKEN;
	const getMediaIDs = async (url, mediaArray) => {
		try {
			const mediaData = await axios.get(url);
			const { data, paging: { next } } = mediaData.data;
			const mediaIDs = mediaArray ? mediaArray.concat(data) : data;
			return { mediaIDs, next }
		} catch (err) {
			console.log(err)
		}
	}

	const initialCall = `https://graph.facebook.com/v3.2/17841406842055532/media?access_token=${instaToken}`

	const mediaPromises = (data) => data.map(({ id }) => {
			return axios.get(`https://graph.facebook.com/v2.12/${id}?access_token=${instaToken}&fields=media_type,media_url,timestamp,caption`)
				.then(({ data: { timestamp, caption, media_type, media_url }})=>{
					return { 
						caption,
						timestamp, 
						mediaType: media_type, 
						mediaUrl: media_url 
					}
				})
				.catch(console.log)
	})

	getMediaIDs(initialCall)
		.then(({ mediaIDs, next })=>{
			return getMediaIDs(next, mediaIDs)
		})
		.then(({ mediaIDs })=>{
			if (!mediaIDs) {throw new Error};
			return mediaPromises(mediaIDs)
		})
		.then(mediaPromises => Promise.all(mediaPromises))
		.then(mediaData => {
			updateRecentMedia(mediaData)
		})
		.catch(console.log)
}








