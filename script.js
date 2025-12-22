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

// Floating Widget Elements
const widgetGold24 = document.getElementById("widget-gold24");
const widgetGold22 = document.getElementById("widget-gold22");
const widgetGold18 = document.getElementById("widget-gold18");
const widgetSilver = document.getElementById("widget-silver");
const floatingWidget = document.getElementById("floatingWidget");
const widgetToggle = document.getElementById("widgetToggle");
const widgetHeader = document.getElementById("widgetHeader");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Widget Toggle Functionality
if (widgetHeader && floatingWidget) {
    widgetHeader.addEventListener('click', () => {
        floatingWidget.classList.toggle('minimized');
    });
}

function formatPrice(v) {
    if (v === undefined || v === null || isNaN(v)) return "-";
    return Number(v).toFixed(2);
}

const ref = doc(db, "settings", "gold");

console.log("Connecting to Firebase for live rates...");

onSnapshot(ref, (snap) => {
    if (snap.exists()) {
        const data = snap.data();
        console.log("Live rates updated:", data);

        // Update main section
        if (el24) el24.textContent = formatPrice(data.gold24);
        if (el22) el22.textContent = formatPrice(data.gold22);
        if (el18) el18.textContent = formatPrice(data.gold18);
        if (elSilver) elSilver.textContent = formatPrice(data.silver);

        // Update floating widget
        if (widgetGold24) widgetGold24.textContent = formatPrice(data.gold24);
        if (widgetGold22) widgetGold22.textContent = formatPrice(data.gold22);
        if (widgetGold18) widgetGold18.textContent = formatPrice(data.gold18);
        if (widgetSilver) widgetSilver.textContent = formatPrice(data.silver);

        if (lastUpdated) {
            lastUpdated.textContent = "Last updated: " + new Date().toLocaleString();
        }
    } else {
        console.warn("No price data found in Firebase (settings/gold)");
        if (el24) el24.textContent = "-";
        if (el22) el22.textContent = "-";
        if (el18) el18.textContent = "-";
        if (elSilver) elSilver.textContent = "-";

        // Update floating widget
        if (widgetGold24) widgetGold24.textContent = "-";
        if (widgetGold22) widgetGold22.textContent = "-";
        if (widgetGold18) widgetGold18.textContent = "-";
        if (widgetSilver) widgetSilver.textContent = "-";
    }
}, (error) => {
    console.error("Firebase Snapshot Error:", error);
    if (lastUpdated) {
        lastUpdated.textContent = "Live update error: " + error.code;
    }
});
