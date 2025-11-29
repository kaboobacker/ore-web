import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { doc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// SAME CONFIG AS ADMIN PANEL
const firebaseConfig = {
    apiKey: "AIzaSyAhrwhvGbPd96wJk1tlA_PTORngP0SdqW0",
    authDomain: "gold-live-price-c60cb.firebaseapp.com",
    projectId: "gold-live-price-c60cb",
    storageBucket: "gold-live-price-c60cb.firebasestorage.app",
    messagingSenderId: "288803626436",
    appId: "1:288803626436:web:5296a37e04fe37a501d891",
    measurementId: "G-ZE2SC7Y860"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// GET ELEMENTS BY ID
const el24 = document.getElementById("gold24");
const el22 = document.getElementById("gold22");
const el18 = document.getElementById("gold18");
const elSilver = document.getElementById("silver");
const lastUpdated = document.getElementById("lastUpdated");
const yearSpan = document.getElementById("year");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

function formatPrice(v) {
    if (v === undefined || v === null || isNaN(v)) return "-";
    return Number(v).toFixed(2);
}

const ref = doc(db, "settings", "gold");

onSnapshot(ref, (snap) => {
    if (snap.exists()) {
        const data = snap.data();

        el24.textContent = formatPrice(data.gold24);
        el22.textContent = formatPrice(data.gold22);
        el18.textContent = formatPrice(data.gold18);
        elSilver.textContent = formatPrice(data.silver);

        if (lastUpdated) {
            lastUpdated.textContent = "Last updated: " + new Date().toLocaleString();
        }
    } else {
        el24.textContent = "-";
        el22.textContent = "-";
        el18.textContent = "-";
        elSilver.textContent = "-";
    }
});
