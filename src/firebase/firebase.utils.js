import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCCDjqfcSX_3SdonrKNRLrQn2ug4VEm2D4',
	authDomain: 'crinkle-db.firebaseapp.com',
	databaseURL: 'https://crinkle-db.firebaseio.com',
	projectId: 'crinkle-db',
	storageBucket: 'crinkle-db.appspot.com',
	messagingSenderId: '33161737278',
	appId: '1:33161737278:web:d209ee630782fbb0c68d6f',
	measurementId: 'G-QJQE469XEM'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// check for auth object, return from function if not
	if (!userAuth) return;
	// if auth object does exist, query firestore for document/auth object with uid property
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();
	// check if user data exists in firestore, if user doesn't exist create data there using data from userAuth object
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// this can be used to batch add data to firebase db
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

// transform snapshot data into an object and add routename and id properties
export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();
		return {
			routename: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

// set up google authentication utility
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// trigger google pop up whenever GoogleAuthProvider is used
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
