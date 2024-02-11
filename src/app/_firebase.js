// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASxriUoMRr-jM2h881jQ77T7v5xxlRZzA",
  authDomain: "get-my-doctor.firebaseapp.com",
  databaseURL: "https://get-my-doctor-default-rtdb.firebaseio.com",
  projectId: "get-my-doctor",
  storageBucket: "get-my-doctor.appspot.com",
  messagingSenderId: "107874235536",
  appId: "1:107874235536:web:ca965b4638acd891ecd415",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

const initFirebase = () => {
  return app;
};

export { initFirebase, database };
