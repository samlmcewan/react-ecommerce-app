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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// set up google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google pop up whenever GoogleAuthProvider is used
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
