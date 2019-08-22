const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const storage = multerS3({
    s3,
    bucket: 'bon-vivant-images',
    key: function (req, file, cb) {
    	const { originalname } = file;
    	const nameSplit = originalname.split('.')
    	const name = nameSplit[0];
    	const fileType = nameSplit[1];
        cb(null, `${originalname}_${new Date().toISOString()}.${fileType}`)
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
	const productID = req.body;
	const date = new Date();
	const images = req.files.map(({ location }) => {
		return { 
			product_id: productID, 
			media_url: location, 
			timestamp: date
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



module.exports = {
	updateCollection,
	uploadImages,
	updateCollectionImages
}