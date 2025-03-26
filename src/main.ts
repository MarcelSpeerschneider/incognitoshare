// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { provideFirebaseApp, initializeApp as initializeAngularFireApp } from '@angular/fire/app';
import { provideFirestore, getFirestore as getAngularFirestore } from '@angular/fire/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4GlCW0dluxaR7pg2GWmBN-vxg4M3K_y4",
  authDomain: "anonylink-fb958.firebaseapp.com",
  projectId: "anonylink-fb958",
  storageBucket: "anonylink-fb958.firebasestorage.app",
  messagingSenderId: "424670996801",
  appId: "1:424670996801:web:75d391c38b40a505bc19c0"
};
// Initialize Firebase (falls du direkten Firebase-Zugriff benötigst)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test der Datenbankverbindung
async function testDatabaseConnection() {
  try {
    // Versuche, eine beliebige Collection zu lesen (ersetze "test" durch eine vorhandene Collection)
    const testCollection = collection(db, "test");
    const snapshot = await getDocs(testCollection);
    console.log("Firestore-Verbindung erfolgreich!");
    console.log(`Anzahl der Dokumente in "test": ${snapshot.size}`);
    return true;
  } catch (error) {
    console.error("Fehler bei der Verbindung zu Firestore:", error);
    return false;
  }
}

// Führe den Test aus
testDatabaseConnection();


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // Angular Fire Provider
    provideFirebaseApp(() => initializeAngularFireApp(firebaseConfig)),
    provideFirestore(() => getAngularFirestore())
  ]
}).catch(err => console.error(err));