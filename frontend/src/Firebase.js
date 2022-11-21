import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC30CpP5NP6Ctd0xxK3PdBdGq5XJL2tDV4",
  authDomain: "lobanovdripauth.firebaseapp.com",
  projectId: "lobanovdripauth",
  storageBucket: "lobanovdripauth.appspot.com",
  messagingSenderId: "866180743062",
  appId: "1:866180743062:web:2f8e30bdcd25e67bb3e7b7"
};

const app = initializeApp(firebaseConfig);

export const auth_ = getAuth(app);
export const provider = new GoogleAuthProvider();