import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInputComponent } from './link-input/link-input.component';
import { ResultComponent } from './result/result.component';
import { LinkAnonymizerService } from './services/link-anonymizer.service';
import { HttpClientModule } from '@angular/common/http';
import { TrackerDatabaseService } from './services/tracker-database.service'; // Add this import
import { DatabaseTestService } from './services/database-test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    LinkInputComponent,
    ResultComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AnonyLink';
  inputLink: string = '';
  anonymizedLink: string = '';
  showResult: boolean = false;

  constructor(
    private linkAnonymizerService: LinkAnonymizerService,
    private trackerDb: TrackerDatabaseService, // Add this dependency
    private dbTestService: DatabaseTestService
  ) { }

  ngOnInit(): void {
    this.trackerDb.initializeDatabase();
    this.testDatabase();
  }

  onLinkInput(link: string): void {
    this.inputLink = link;
  }

  anonymizeLink(): void {
    if (!this.inputLink) {
      alert('Please enter a link.');
      return;
    }

    try {
      this.linkAnonymizerService.anonymizeLink(this.inputLink, 'tiktok').subscribe({
        next: (result: string) => {
          this.anonymizedLink = result;
          this.showResult = true;
        },
        error: (error) => {
          if (error instanceof Error) {
            this.anonymizedLink = 'Error processing the link: ' + error.message;
          } else {
            this.anonymizedLink = 'An unknown error occurred.';
          }
          this.showResult = true;
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        this.anonymizedLink = 'Error processing the link: ' + error.message;
      } else {
        this.anonymizedLink = 'An unknown error occurred.';
      }
      this.showResult = true;
    }
  }

  async testDatabase() {
    const isConnected = await this.dbTestService.testConnection();
    if (isConnected) {
      console.log("✅ Datenbank ist verbunden!");
    } else {
      console.log("❌ Datenbank ist nicht verbunden!");
    }
  }
}