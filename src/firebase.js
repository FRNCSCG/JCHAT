import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCri-zSURK7Sas-XgLcwGG5ZNt5TUWRA38",
  authDomain: "justchat-app-7ee05.firebaseapp.com",
  projectId: "justchat-app-7ee05",
  storageBucket: "justchat-app-7ee05.appspot.com",
  messagingSenderId: "841131002102",
  appId: "1:841131002102:web:9f7632d5b97f043be244d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();