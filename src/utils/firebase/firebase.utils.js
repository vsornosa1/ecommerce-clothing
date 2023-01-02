import { initializeApp } from 'firebase/app';
import { 
	getAuth,
	signOut,
	signInWithPopup, 
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();



export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if(!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
					displayName,
					email,
					createdAt,
					...additionalInformation
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}

		return userDocRef;
	}
}



export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);
