import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, updateDoc, deleteField, doc  } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "", // <---- Add API-KEY ! ----
    authDomain: "testi-1e4a7.firebaseapp.com",
    projectId: "testi-1e4a7",
    storageBucket: "testi-1e4a7.firebasestorage.app",
    messagingSenderId: "128781565156",
    appId: "1:128781565156:web:8188003e1c296482be00f1"
    };

initializeApp(firebaseConfig)

const firestore = getFirestore()

const SHOPPINGLIST = 'shoppinglist' 

export {
    firestore,
    collection,
    addDoc,
    SHOPPINGLIST,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    deleteField,
    doc
}