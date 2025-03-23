import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnChanges {
  @Input() anonymizedLink: string = '';
  copyButtonText: string = 'Copy to Clipboard';

  constructor() { }

  ngOnChanges(): void {
    // Reset the copy button text when the link changes
    this.copyButtonText = 'Copy to Clipboard';
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.anonymizedLink)
      .then(() => {
        this.copyButtonText = 'Copied!';
        setTimeout(() => {
          this.copyButtonText = 'Copy to Clipboard';
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Copying failed. Please copy the link manually.');
      });
  }
}