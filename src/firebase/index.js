
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlmhdZXEhz3x3AC4HRUX7h8i0DMWzD-MU",
  authDomain: "todo-ignorante.firebaseapp.com",
  projectId: "todo-ignorante",
  storageBucket: "todo-ignorante.appspot.com",
  messagingSenderId: "253234749374",
  appId: "1:253234749374:web:0c88fa7ca9888325be23ef"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}