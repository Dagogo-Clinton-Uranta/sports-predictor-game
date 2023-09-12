import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCdlxFQSkuSiCD80rJnuuOVLbfwdtyKPzs",
  authDomain: "ibara-34497.firebaseapp.com",
  projectId: "ibara-34497",
  storageBucket: "ibara-34497.appspot.com",
  messagingSenderId: "886817189981",
  appId: "1:886817189981:web:f69ca549f78c1186cbddb4",
  measurementId: "G-TNGY4Q8KYS"
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






