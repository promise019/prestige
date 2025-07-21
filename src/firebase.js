import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWHG1ozE11Gn-_0wC9pW6-HVswdEeG0RY",
  authDomain: "prestige2earn.firebaseapp.com",
  projectId: "prestige2earn",
  storageBucket: "prestige2earn.firebasestorage.app",
  messagingSenderId: "20672908410",
  appId: "1:20672908410:web:5a1f2226e294125e8ebfc3",
  measurementId: "G-5836XCLG31"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export {db, auth}