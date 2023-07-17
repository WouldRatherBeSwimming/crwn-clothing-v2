import { initializeApp } from 'firebase/app'
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        // 99
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
     } from 'firebase/auth'
// 95, setting up user documents
import { getFirestore,
         doc,
         getDoc,
         setDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1by0WYfgn8gcKb9jAZmqNi3mGtJww0yM",
    authDomain: "crwn-clothing-db-c0221.firebaseapp.com",
    projectId: "crwn-clothing-db-c0221",
    storageBucket: "crwn-clothing-db-c0221.appspot.com",
    messagingSenderId: "3889422411",
    appId: "1:3889422411:web:03524c3fcba499a5c0edce"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => { // 100
    if (!userAuth) return // 99

    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    ////////////////////////////
    // 96
    ////////////////////////////
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch(error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
}

// 99
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

// 103
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}