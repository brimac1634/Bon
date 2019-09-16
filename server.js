const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const knex = require('knex');
const compression = require('compression');

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

app.use(compression);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
 
app.post('/upload-images', collection.uploadImages(), (req, res) => { collection.handleImageUpload(req, res, db)
})

app.post('/update-images', (req, res) => { 
  collection.handleImageUpdate(req, res, db)
})

app.post('/update-collection', (req, res) => { 
  collection.updateCollection(req, res, db)
})

app.post('/delete-product', (req, res) => { 
  collection.deleteProduct(req, res, db)
})

app.post('/payment', (req, res) => { payment.handlePayment(req, res) })

app.post('/contact-us', (req, res) => { contact.handleContact(req, res) })








