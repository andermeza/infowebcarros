
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCUopG4fMFw2EDMtkrwXdIYhumzhCxVHUE",
  authDomain: "webcarros-a2a8b.firebaseapp.com",
  projectId: "webcarros-a2a8b",
  storageBucket: "webcarros-a2a8b.appspot.com",
  messagingSenderId: "241198076635",
  appId: "1:241198076635:web:0a6c0a761b033213d5b2fe"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };