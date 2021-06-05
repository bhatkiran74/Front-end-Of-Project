import firebase from 'firebase'



// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCemhuXoi8pnItNes50fKRbfKIdY9SLAW0",
  authDomain: "e-comsite.firebaseapp.com",
  databaseURL: "https://e-comsite.firebaseio.com",
  projectId: "e-comsite",
  storageBucket: "e-comsite.appspot.com",
  messagingSenderId: "1013765450222",
  appId: "1:1013765450222:web:b5879aa231e517b40506ff"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)  // initialze the firebase 

const db = firebaseApp.firestore()
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider }
export default db 