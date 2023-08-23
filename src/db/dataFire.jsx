// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDufP6aDd4zzLHmSWTIXlBrWUdVcXdlPDE",
  authDomain: "mamichechi-a0bb3.firebaseapp.com",
  projectId: "mamichechi-a0bb3",
  storageBucket: "mamichechi-a0bb3.appspot.com",
  messagingSenderId: "301587532236",
  appId: "1:301587532236:web:6034d3fd45fdb60951f569",
  measurementId: "G-9TS5L7WQ1F"
};

initializeApp(firebaseConfig);
const dataFire = getFirestore()
export default dataFire