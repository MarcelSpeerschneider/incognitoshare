// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerDatabaseService {
  private db = getFirestore();
  private platformsSubject = new BehaviorSubject<{ [key: string]: any }>({});
  private globalTrackersSubject = new BehaviorSubject<string[]>([]);

  platforms$ = this.platformsSubject.asObservable();
  globalTrackers$ = this.globalTrackersSubject.asObservable();

  isInitialized = false;

  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      // Fetch platforms data
      const platformsSnapshot = await getDocs(collection(this.db, 'platforms'));
      const platforms: { [key: string]: any } = {};

      platformsSnapshot.forEach((doc) => {
        platforms[doc.id] = doc.data();
      });

      this.platformsSubject.next(platforms);

      // Fetch global trackers
      const globalTrackersSnapshot = await getDocs(collection(this.db, 'global_trackers'));
      const globalTrackers: string[] = [];

      globalTrackersSnapshot.forEach((doc) => {
        globalTrackers.push(doc.id);
      });

      this.globalTrackersSubject.next(globalTrackers);

      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  getPlatforms(): Observable<{ [key: string]: any }> {
    return this.platforms$;
  }

  getGlobalTrackers(): Observable<string[]> {
    return this.globalTrackers$;
  }
}