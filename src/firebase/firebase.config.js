// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8h20bGiBBlSXSB0liZOBbEq2nUiAfl-Q",
    authDomain: "tasktrek-55a4e.firebaseapp.com",
    projectId: "tasktrek-55a4e",
    storageBucket: "tasktrek-55a4e.firebasestorage.app",
    messagingSenderId: "844600437212",
    appId: "1:844600437212:web:dab5a7acb9bf8c90338719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;