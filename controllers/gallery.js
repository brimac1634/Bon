const knex = require('knex');
const axios = require('axios');

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

const getGallery = (res) => {
	db.select('*').from('gallery')
		.orderBy('timestamp', 'desc')
		.then(gallery => res.status(200).send(gallery))
		.catch(res.status(500))
}


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
			return axios.get(`https://graph.facebook.com/v2.12/${id}?access_token=${instaToken}&fields=id,media_type,media_url,timestamp,caption`)
				.then(({ data: { id, timestamp, caption, media_type, media_url }})=>{
					return { 
						id,
						caption,
						timestamp, 
						media_type, 
						media_url 
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
			db.transaction(trx =>{
				trx('gallery')
				.returning('*')
				.del()
				.then(()=>{
					return trx('gallery')
						.returning('*')
						.insert(mediaData)
						.then(()=>console.log('media updated'))
						.catch(console.log)
				})
				.then(trx.commit)
				.catch(trx.rollback)
			})
			.catch(console.log)
		})
		.catch(console.log)
}

module.exports = {
	getGallery,
	getRecentMedia
}

