// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { getDatabase, ref, set } from "firebase/database";

export const FIRE_BASE_WEB_PUSH_CERTIFICATES =
    "BB_c_sm-dLdJzExBTBzqqvkgZUdvnd6wPt6zZlddCxWkk15Mv-kRP7siQlQYxTEn5HbngPr_VVVf8ALEuZ9vctA";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC40bT2atfbQKum70dPL2QNS0_05yiD4rA",
    authDomain: "pirate-mobile-478d0.firebaseapp.com",
    projectId: "pirate-mobile-478d0",
    storageBucket: "pirate-mobile-478d0.appspot.com",
    messagingSenderId: "932149881557",
    appId: "1:932149881557:web:726c79fb3f7c2f8e5d905c",
    measurementId: "G-NHPXDMJXWJ",
    databaseURL:
        "https://pirate-mobile-478d0-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Firebase Cloud Messaging and get a reference to the service
// export const messaging = getMessaging(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export const writeUserData = async (userId: string, payload: any) => {
    set(ref(database, "users/" + userId), {
        ...payload,
    });
};

export default app;
