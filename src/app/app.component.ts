import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformSelectionComponent } from './platform-selection/platform-selection.component';
import { LinkInputComponent } from './link-input/link-input.component';
import { ResultComponent } from './result/result.component';
import { LinkAnonymizerService } from './services/link-anonymizer.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,  // Importieren Sie HttpClientModule hier
    PlatformSelectionComponent,
    LinkInputComponent,
    ResultComponent
  ],
  // Service is provided in root
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IgocnitoShare';
  selectedPlatform: string = 'tiktok';
  inputLink: string = '';
  anonymizedLink: string = '';
  showResult: boolean = false;

  constructor(private linkAnonymizerService: LinkAnonymizerService) { }

  onPlatformSelected(platform: string): void {
    this.selectedPlatform = platform;
  }

  onLinkInput(link: string): void {
    this.inputLink = link;
  }

  anonymizeLink(): void {
    if (!this.inputLink) {
      alert('Bitte geben Sie einen Link ein.');
      return;
    }

    try {
      this.linkAnonymizerService.anonymizeLink(this.inputLink, this.selectedPlatform).subscribe({
        next: (result: string) => {
          this.anonymizedLink = result;
          this.showResult = true;
        },
        error: (error) => {
          if (error instanceof Error) {
            this.anonymizedLink = 'Fehler bei der Verarbeitung des Links: ' + error.message;
          } else {
            this.anonymizedLink = 'Ein unbekannter Fehler ist aufgetreten.';
          }
          this.showResult = true;
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        this.anonymizedLink = 'Fehler bei der Verarbeitung des Links: ' + error.message;
      } else {
        this.anonymizedLink = 'Ein unbekannter Fehler ist aufgetreten.';
      }
      this.showResult = true;
    }
  }
}