import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkAnonymizerService {
  // URL des Backend-Services
  private backendUrl = 'https://us-central1-incognitoshare.cloudfunctions.net/resolveUrl';

  constructor(private http: HttpClient) { }

  /**
   * Anonymisiert einen Link je nach Plattform
   * @param inputLink Der zu anonymisierende Link
   * @param platform Die Plattform des Links
   * @returns Observable mit dem anonymisierten Link
   */
  anonymizeLink(inputLink: string, platform: string): Observable<string> {
    if (!inputLink) {
      return of('');
    }

    try {
      switch (platform) {
        case 'tiktok':
          // TikTok-Links verarbeiten
          if (inputLink.includes('vm.tiktok.com') || inputLink.includes('vt.tiktok.com')) {
            // Bei kurzen TikTok-Links den Backend-Service verwenden
            return this.resolveShortUrl(inputLink).pipe(
              map(resolvedUrl => {
                console.log('Resolved TikTok URL:', resolvedUrl);
                // Parameter entfernen
                return this.removeParameters(resolvedUrl);
              }),
              catchError(error => {
                console.error('Error resolving TikTok URL:', error);
                return of(this.removeParameters(inputLink));
              })
            );
          } else {
            // Bei bereits vollständigen TikTok-Links nur Parameter entfernen
            return of(this.removeParameters(inputLink));
          }

        case 'youtube':
          // YouTube-Links - Nur die Video-ID behalten
          try {
            const ytUrlObj = new URL(inputLink);
            const videoId = ytUrlObj.searchParams.get('v');

            if (videoId) {
              return of(`https://www.youtube.com/watch?v=${videoId}`);
            } else {
              // Wenn kein v-Parameter, für youtu.be-Links prüfen
              if (inputLink.includes('youtu.be/')) {
                const segments = inputLink.split('/');
                const shortVideoId = segments[segments.length - 1].split('?')[0];
                return of(`https://www.youtube.com/watch?v=${shortVideoId}`);
              } else {
                return of(this.removeParameters(inputLink));
              }
            }
          } catch (error) {
            console.error('Error processing YouTube URL:', error);
            return of(this.removeParameters(inputLink));
          }

        case 'twitter':
          // Twitter/X-Links - Parameter entfernen
          try {
            const twitterUrlObj = new URL(inputLink);
            return of(`${twitterUrlObj.origin}${twitterUrlObj.pathname}`);
          } catch (error) {
            console.error('Error processing Twitter URL:', error);
            return of(this.removeParameters(inputLink));
          }

        default:
          // Für alle anderen Plattformen einfach die Parameter entfernen
          return of(this.removeParameters(inputLink));
      }
    } catch (error) {
      console.error('General error processing link:', error);
      return of(inputLink);
    }
  }

  /**
   * Verwendet den Backend-Service zum Auflösen von kurzen URLs
   */
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

  /**
   * Hilfsmethode zum Entfernen der URL-Parameter
   */
  private removeParameters(url: string): string {
    try {
      return url.split('?')[0];
    } catch {
      return url;
    }
  }
}