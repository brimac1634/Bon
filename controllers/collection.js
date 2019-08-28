
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const bucket = 'bon-vivant-images';

const storage = multerS3({
    s3,
    bucket,
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
	const { productID, name, price, quantity, description, features } = req.body;
	const featuresString = features 
		? features.join(';')
		: null
	if (productID) {
		//editing collection item
		db('collection')
			.returning('*')
			.where('product_id', productID)
			.update({
				name, 
				price,
				quantity,
				description, 
				features: featuresString,
			})
			.then(item => res.send(item))
			.catch(err => {
				console.log(err)
				res.status(500).send('unable to update item')
			})
	} else {
		//new item
		db('collection')
			.returning('*')
			.insert({ 
				name, 
				price,
				quantity,
				description, 
				features: featuresString,
				timestamp: new Date() 
			})
			.then(item => res.send(item))
			.catch(err => {
				console.log(err)
				res.status(500).send('unable to add item')
			})
	}
}

const handleImageUpdate = (req, res, db) => {
	const { productID, imageURLs } = req.body;
	db.select('*').from('images')
		.where('product_id', productID)
		.then(images => {
			images.forEach(({ image_id, key, media_url }) => {
				if (!imageURLs.includes(media_url)) {
					s3.deleteObject({
					    Bucket: bucket,
					    Key: key
					}, (err, data) => {
						if (err) return;
						db('images')
							.returning('*')
							.where('image_id', image_id)
							.del()
							.catch(err => console.log(err))
					})
				}
			})
		})
		.then(()=>res.send('images removed'))
		.catch(err =>{
			console.log(err)
			res.status(500).send('unable to update existing images')
		})
}

const handleImageUpload = (req, res, db) => {
	const { productID } = req.body;
	const images = req.files.map(({ key, location }) => {
		return { 
			product_id: Number(productID), 
			key,
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

const deleteProduct = (req, res, db) => {
	const { productID } = req.body;
	db.transaction(trx => {
		return trx('collection')
		.returning('*')
		.where('product_id', productID)
		.del()
		.then(() => {
			return trx('images')
			.returning('*')
			.where('product_id', productID)
			.del()
			.then(images => {
				images.forEach(({ key }) => {
					s3.deleteObject({
					    Bucket: bucket,
					    Key: key
					}, (err, data) => {
						if (err) throw new Error;
					})
				})
				res.send('item deleted')
			})
			.catch(err => {
				console.log(err)
				res.status(500).send('unable to delete item')
			})
		})
		.then(trx.commit)
		.catch(trx.rollback) 
	})
}

const getCollection = (res, db) => {
	db.select('*').from('collection')
		.orderBy('timestamp', 'desc')
		.then(products => {
			return products.map(product => {
				const { product_id, features } = product;
				return db.select('media_url', 'timestamp').from('images')
					.where('product_id', product_id)
					.orderBy('timestamp', 'asc')
					.then(mediaURLs => {
						const images = mediaURLs.map(url => url.media_url)
						return {
							...product,
							productID: product_id, 
							features: features ? features.split(';') : null,
							images
						}
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
	deleteProduct,
	handleImageUpdate,
	handleImageUpload
}