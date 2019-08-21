const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const storage = multerS3({
    s3,
    bucket: 'bon-vivant-images',
    metadata: function (req, file, cb) {
        cb(null, {productID: req.body.productID});
    },
    key: function (req, file, cb) {
    	const fileType = file.mimetype.split('/')[1];
        cb(null, `${req.body.productID}_${new Date().toISOString()}.${fileType}`)
    }
})

const fileFilter = (req, file, cb) => {
	if (file.mimtype === 'image/jpeg' || file.mimtype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
  storage,
  fileFilter
})

const uploadImages = () => upload.array('images')

const updateCollectionImages = (req, res, db) => {
	const date = new Date();
	const images = req.files.map(({ metadata, location }) => {
		return { 
			product_id: metadata.productID, 
			media_url: location, 
			timestamp: date
		}
	})
	db.select('*').from('images')
		.insert(images)
		.then(images => {
			console.log('images uploaded', images)
			res.status(200)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send('unable to upload photos')
		})

}



module.exports = {
	uploadImages,
	updateCollectionImages
}