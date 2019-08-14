const admin = require('firebase-admin');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

admin.initializeApp();

const firestore = admin.firestore();

const addObjects = async (collectionRef, objectsToAdd) => {
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc()
		batch.set(newDocRef, obj);
	})
	await batch.commit()
}

const deleteCollection = (db, collectionPath, batchSize) => {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  query.get()
    .then((snapshot) => {
	    if (snapshot.size == 0) {
	      return 0;
	    };
	    let batch = db.batch();
	    snapshot.docs.forEach((doc) => {
	      batch.delete(doc.ref);
	    })
	    return batch.commit().then(() => {
	      return snapshot.size;
	    });
    }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }
  
        process.nextTick(() => {
          deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
    })
    .catch(reject);
}

const updateRecentMedia = async (objectsToAdd) => {
	if (!objectsToAdd) return;
	const galleryRef = firestore.collection('gallery');
	try {
		const snapShot = await galleryRef.get()
		await deleteCollection(firestore, 'gallery', 30)
		addObjects(galleryRef, objectsToAdd)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	updateRecentMedia
}