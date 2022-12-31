import { initializeApp } from 'firebase/app';
import { 
	getAuth, 
	signInWithRedirect, 
	signInWithPopup, 
	GoogleAuthProvider
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBroLf8B7EbHpSda6oSV5E3u9V0tmZ164k",
  authDomain: "ecommerce-clothing-db-af8e4.firebaseapp.com",
  projectId: "ecommerce-clothing-db-af8e4",
  storageBucket: "ecommerce-clothing-db-af8e4.appspot.com",
  messagingSenderId: "482386216590",
  appId: "1:482386216590:web:3cb36c9cd133dd89d72bdf"
};
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
					displayName,
					email,
					createdAt
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}

		return userDocRef;
	}
}
