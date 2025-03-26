// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4GlCW0dluxaR7pg2GWmBN-vxg4M3K_y4",
  authDomain: "anonylink-fb958.firebaseapp.com",
  projectId: "anonylink-fb958",
  storageBucket: "anonylink-fb958.firebasestorage.app",
  messagingSenderId: "424670996801",
  appId: "1:424670996801:web:75d391c38b40a505bc19c0"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};