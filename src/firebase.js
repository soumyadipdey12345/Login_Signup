import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBAfMbeHN37cisjTFIWqEO2uP7mZktT39c",
  authDomain: "test-auth-35c65.firebaseapp.com",
  projectId: "test-auth-35c65",
  storageBucket: "test-auth-35c65.appspot.com",
  messagingSenderId: "561168259745",
  appId: "1:561168259745:web:58eb0d2660020a29352ee0",
  measurementId: "G-5KPRFENCF5"
})

export const auth = app.auth()
export default app
