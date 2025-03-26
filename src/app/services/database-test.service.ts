// src/app/services/database-test.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseTestService {
  constructor(private firestore: Firestore) {}

  async testConnection(): Promise<boolean> {
    try {
      // Versuche, eine beliebige Collection zu lesen (ersetze "test" durch eine vorhandene Collection)
      const testCollection = collection(this.firestore, "test");
      const snapshot = await getDocs(testCollection);
      console.log("Firestore-Verbindung erfolgreich!");
      console.log(`Anzahl der Dokumente in "test": ${snapshot.size}`);
      return true;
    } catch (error) {
      console.error("Fehler bei der Verbindung zu Firestore:", error);
      return false;
    }
  }
}