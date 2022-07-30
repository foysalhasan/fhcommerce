import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// 1. INTIALIZING FIREBASE
const firebaseConfig = {
  apiKey: 'AIzaSyDjRFYDpIfvBOKio7jV01mf_Y_tjxgvumA',
  authDomain: 'crown-commerce-5fbe5.firebaseapp.com',
  projectId: 'crown-commerce-5fbe5',
  storageBucket: 'crown-commerce-5fbe5.appspot.com',
  messagingSenderId: '1067236477294',
  appId: '1:1067236477294:web:a256d8375bc2a42ad9d97f',
}

const googleApp = initializeApp(firebaseConfig)
export const storage = getStorage(googleApp)
// 2. GOOGLE AUTH SIGN IN
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth()
export const googleSignInPopup = () => signInWithPopup(auth, provider)
export const googleSignInRedirect = () => signInWithRedirect(auth, provider)

// 3. FIRE STORE DATABASE
const db = getFirestore(googleApp)
export const createUserDocFromAuth = async (userAuth, userInfo = {}) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    try {
      const { email, displayName, photoURL } = userAuth
      const createdAt = new Date()
      await setDoc(userDocRef, {
        createdAt,
        displayName,
        email,
        photoURL,
        ...userInfo,
      })
    } catch (error) {
      console.log('Error Creating User', error.message)
    }
  }
  return userDocRef
}

// 4. CREATE USER WITH EMAIL AND PASSWORD
export const createAuthUserByEmailPass = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

// 5. CREATE USER WITH EMAIL AND PASSWORD
export const signInAuthUserByEmailPass = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

// 6. SIGN OUT USER
export const signOutUser = async () => await signOut(auth)
export const onAuthStateChangedListener = (callBack) => onAuthStateChanged(auth, callBack)

// USER INFORMATION
export const getUserData = async (uid) => {
  const userRef = doc(db, 'users', uid)
  try {
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      console.log('No such data!')
    }
  } catch (error) {
    console.log(error.message)
  }
}
// ON-AUTHSTATECHANE LISTENER
