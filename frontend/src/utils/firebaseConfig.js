import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBjDTd_HuiKfThsxmgpPlpXmPFen51ANn4",
  authDomain: "estate-55f4c.firebaseapp.com",
  projectId: "estate-55f4c",
  storageBucket: "estate-55f4c.firebasestorage.app",
  messagingSenderId: "535840473569",
  appId: "1:535840473569:web:1fd781c2fd6e52432992a0",
  measurementId: "G-MTPSG58ZQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
