import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCHDSt72RN57_WvMALhNABaFsZXblHznTc",
    authDomain: "bonv-73e16.firebaseapp.com",
    databaseURL: "https://bonv-73e16.firebaseio.com",
    projectId: "bonv-73e16",
    storageBucket: "",
    messagingSenderId: "713543407983",
    appId: "1:713543407983:web:587b3a972cea4ac0"
  }

export const createUserProfileDocument = async (userAuth, otherData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...otherData
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}
	return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc()
		batch.set(newDocRef, obj);
	})

	await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	})
	return transformedCollection.reduce((accum, collection) => {
		accum[collection.routeName] = collection
		return accum;
	}, {})
}

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth); 
		}, reject)
	});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default firebase;
