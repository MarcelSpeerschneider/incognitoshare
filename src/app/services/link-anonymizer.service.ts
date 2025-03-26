// src/app/services/link-anonymizer.service.ts (modified)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { TrackerDatabaseService } from './tracker-database.service';

export interface AnonymizeResult {
  cleanUrl: string;
  parametersRemoved: number;
  trackersDetected: number;
}

@Injectable({
  providedIn: 'root'
})
export class LinkAnonymizerService {
  // Backend service URL
  private backendUrl = 'https://us-central1-incognitoshare.cloudfunctions.net/resolveUrl';
  
  // Platform and tracker data from Firestore
  private platforms: {[key: string]: any} = {};
  private globalTrackers: string[] = [];

  constructor(
    private http: HttpClient,
    private databaseService: TrackerDatabaseService
  ) {
    // Subscribe to database updates
    this.databaseService.platforms$.subscribe(platforms => {
      this.platforms = platforms;
    });
    
    this.databaseService.globalTrackers$.subscribe(trackers => {
      this.globalTrackers = trackers;
    });
  }

  /**
   * Anonymizes a link by removing tracking parameters
   */
  anonymizeLink(inputLink: string, platform: string): Observable<string> {
    if (!inputLink) {
      return of('');
    }

    // Wait for database to be initialized if needed
    return this.ensureDatabaseInitialized().pipe(
      switchMap(() => {
        try {
          // Your existing link processing logic, but using the database data
          // Example:
          if (platform === 'tiktok' && (inputLink.includes('vm.tiktok.com') || inputLink.includes('vt.tiktok.com'))) {
            return this.resolveShortUrl(inputLink).pipe(
              map(resolvedUrl => {
                console.log('Resolved TikTok URL:', resolvedUrl);
                return this.removeParameters(resolvedUrl, platform);
              }),
              catchError(error => {
                console.error('Error resolving TikTok URL:', error);
                return of(this.removeParameters(inputLink, platform));
              })
            );
          } else {
            return of(this.removeParameters(inputLink, platform));
          }
        } catch (error) {
          console.error('General error processing link:', error);
          return of(inputLink);
        }
      })
    );
  }

  private ensureDatabaseInitialized(): Observable<boolean> {
    return of(this.databaseService.isInitialized).pipe(
      switchMap(isInitialized => {
        if (isInitialized) {
          return of(true);
        } else {
          // Wait for the database to be initialized
          return this.databaseService.platforms$.pipe(
            map(platforms => Object.keys(platforms).length > 0),
            take(1)
          );
        }
      })
    );
  }

  private resolveShortUrl(shortUrl: string): Observable<string> {
    return this.http.get<{ resolvedUrl: string }>(`${this.backendUrl}?url=${encodeURIComponent(shortUrl)}`)
      .pipe(
        map(response => response.resolvedUrl),
        catchError(error => {
          console.error('Backend service error:', error);
          throw new Error('Could not resolve URL via backend service');
        })
      );
  }

  private removeParameters(url: string, platform: string): string {
    try {
      // Get platform-specific trackers from our database
      const platformTrackers = this.platforms[platform]?.trackers || [];
      
      const urlObj = new URL(url);
      
      // Remove all parameters for most platforms
      if (platform !== 'youtube') {
        return url.split('?')[0];
      }
      
      // Special handling for YouTube to preserve video ID
      if (platform === 'youtube') {
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          return `https://www.youtube.com/watch?v=${videoId}`;
        }
      }
      
      return url.split('?')[0];
    } catch {
      return url;
    }
  }
}