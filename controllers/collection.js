
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const storage = multerS3({
    s3,
    bucket: 'bon-vivant-images',
    key: function (req, file, cb) {
    	const nameSplit = file.originalname.split('.')
    	const name = nameSplit[0];
    	const fileType = nameSplit[1];
        cb(null, `${name}_${new Date().toISOString()}.${fileType}`)
    }
})

const upload = multer({ storage })

const uploadImages = () => upload.array('images')

const updateCollection = (req, res, db) => {
	const { productID, name, price, quantity, category, description, features } = req.body;
	if (productID) {
		//editing collection item
	} else {
		//new item
		db('collection')
			.returning('*')
			.insert({ 
				name, 
				price,
				quantity, 
				category, 
				description, 
				features,
				timestamp: new Date() 
			})
			.then(item => res.send(item))
			.catch(err => {
				console.log(err)
				res.status(500).send('unable to add item')
			})
	}
}

const updateCollectionImages = (req, res, db) => {
	const { productID } = req.body;
	const images = req.files.map(({ location }) => {
		return { 
			product_id: Number(productID), 
			media_url: location, 
			timestamp: new Date()
		}
	})
	db('images')
		.returning('*')
		.insert(images)
		.then(images => {
			console.log('images uploaded', images)
			res.send(images)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send('unable to upload photos')
		})

}

const getCollection = (res, db) => {
	db.select('*').from('collection')
		.orderBy('timestamp', 'desc')
		.then(products => {
			return products.map(product => {
				return db.select('media_url', 'timestamp').from('images')
					.where('product_id', product.id)
					.orderBy('timestamp', 'desc')
					.then(mediaURLs => {
						const images = mediaURLs.map(url => url.media_url)
						return {...product, images}
					})
					.catch(console.log)
			})
		})
		.then(promises => Promise.all(promises))
		.then(collection => res.send(collection))
		.catch(err => {
			console.log(err)
			res.status(500)
		})
}



module.exports = {
	getCollection,
	updateCollection,
	uploadImages,
	updateCollectionImages
}