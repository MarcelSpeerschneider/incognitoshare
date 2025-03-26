import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() originalLink: string = '';
  
  copyButtonText: string = 'Copy';
  originalLength: number = 0;
  detectedPlatform: string = 'Not detected';
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anonymizedLink'] || changes['originalLink']) {
      // Reset the copy button text when the link changes
      this.copyButtonText = 'Copy';
      
      // Calculate original link length
      this.originalLength = this.originalLink ? this.originalLink.length : 0;
      
      // Detect platform based on the link
      this.detectPlatform();
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.anonymizedLink)
      .then(() => {
        this.copyButtonText = 'Copied!';
        setTimeout(() => {
          this.copyButtonText = 'Copy';
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Copying failed. Please copy the link manually.');
      });
  }
  
  getRemovedParametersCount(): number {
    if (!this.originalLink || !this.anonymizedLink) return 0;
    
    try {
      // Count removed parameters by comparing URLs
      const originalParams = new URL(this.originalLink).searchParams;
      const paramCount = Array.from(originalParams.keys()).length;
      
      // If anonymized link has no parameters, return original count
      if (!this.anonymizedLink.includes('?')) return paramCount;
      
      // Otherwise count remaining parameters and subtract
      const newParams = new URL(this.anonymizedLink).searchParams;
      const newParamCount = Array.from(newParams.keys()).length;
      
      return paramCount - newParamCount;
    } catch (e) {
      // If URL parsing fails, make an estimate
      const originalParamSections = this.originalLink.split('?')[1]?.split('&') || [];
      const newParamSections = this.anonymizedLink.split('?')[1]?.split('&') || [];
      return originalParamSections.length - newParamSections.length;
    }
  }
  
  detectPlatform(): void {
    if (!this.originalLink) return;
    
    const link = this.originalLink.toLowerCase();
    
    if (link.includes('tiktok.com') || link.includes('vm.tiktok') || link.includes('vt.tiktok')) {
      this.detectedPlatform = 'TikTok';
    } else if (link.includes('instagram.com')) {
      this.detectedPlatform = 'Instagram';
    } else if (link.includes('facebook.com') || link.includes('fb.com')) {
      this.detectedPlatform = 'Facebook';
    } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
      this.detectedPlatform = 'YouTube';
    } else if (link.includes('twitter.com') || link.includes('x.com')) {
      this.detectedPlatform = 'Twitter/X';
    } else if (link.includes('linkedin.com')) {
      this.detectedPlatform = 'LinkedIn';
    } else if (link.includes('pinterest.com') || link.includes('pin.it')) {
      this.detectedPlatform = 'Pinterest';
    } else if (link.includes('reddit.com')) {
      this.detectedPlatform = 'Reddit';
    } else {
      this.detectedPlatform = 'Generic';
    }
  }
}