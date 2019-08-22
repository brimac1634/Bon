const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const https = require('https');
const knex = require('knex');

setInterval(function() {
    https.get('https://bon-vivant.herokuapp.com/');
}, 1000000);

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const db = (process.env.PORT == 5000)
	? knex({
      client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'brianmacpherson',
        password : '',
        database : 'bon'
      }
    })
    : knex({
      client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      }
	})

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
const collection = require('./controllers/collection');
const payment = require('./controllers/payment');
const contact = require('./controllers/contact');

app.listen(port, error => {
	if (error) throw error;
	console.log('server running on port ' + port)
})

app.get('/get-gallery', (req, res) => { gallery.getGallery(res, db) })

app.get('/get-collection', (req, res) => { collection.getCollection(res, db) })
 
app.post('/update-collection-images', collection.uploadImages(), (req, res) => { collection.updateCollectionImages(req, res, db)
})
app.post('/update-collection', (req, res) => { 
  collection.updateCollection(req, res, db)
})

app.post('/payment', (req, res) => { payment.handlePayment(req, res) })

app.post('/contact-us', (req, res) => { contact.handleContact(req, res) })








