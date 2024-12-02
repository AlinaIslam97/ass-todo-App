
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, updateDoc, deleteField, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmopH1dthzq7WzunsSu3gTAnaFPav5eU4",
  authDomain: "todo-app-b00bd.firebaseapp.com",
  projectId: "todo-app-b00bd",
  storageBucket: "todo-app-b00bd.firebasestorage.app",
  messagingSenderId: "1058293727866",
  appId: "1:1058293727866:web:159d7364fb66ac715571c3",
  measurementId: "G-7K7DSYKVJQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, updateDoc, deleteField, doc, deleteDoc }
