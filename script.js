import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    doc,
    getFirestore,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAhrwhvGbPd96wJk1tlA_PTORngP0SdqW0",
    authDomain: "gold-live-price-c60cb.firebaseapp.com",
    projectId: "gold-live-price-c60cb",
    storageBucket: "gold-live-price-c60cb.firebasestorage.app",
    messagingSenderId: "288803626436",
    appId: "1:288803626436:web:5296a37e04fe37a501d891"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const priceRef = doc(db, "settings", "gold");

// REAL-TIME UPDATE
onSnapshot(priceRef, (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.data();

        document.querySelectorAll(".p24").forEach(el => el.innerText = data["24k"]);
        document.querySelectorAll(".p22").forEach(el => el.innerText = data["22k"]);
        document.querySelectorAll(".p18").forEach(el => el.innerText = data["18k"]);
        document.querySelectorAll(".pSilver").forEach(el => el.innerText = data["silver"]);
    }
});
