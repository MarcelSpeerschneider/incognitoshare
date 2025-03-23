import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Platform {
  id: string;
  name: string;
  colorClass: string;
  svgPath: string;
}

@Component({
  selector: 'app-platform-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './platform-selection.component.html',
  styleUrls: ['./platform-selection.component.scss']
})
export class PlatformSelectionComponent implements OnInit {
  @Input() selectedPlatform: string = 'tiktok';
  @Output() platformSelected = new EventEmitter<string>();

  platforms: Platform[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      colorClass: 'tiktok-color',
      svgPath: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.044.88.14V9.4a6.13 6.13 0 0 0-3.76 1.23 6.08 6.08 0 0 0-2.32 6.51 6.08 6.08 0 0 0 11.57-2.35l.02-9.32a8.47 8.47 0 0 0 5.24 1.8V3.8c-.697.04-1.383-.16-1.97-.58-.587-.42-1.022-1.03-1.24-1.73H19.6l-.01 5.2z'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      colorClass: 'instagram-color',
      svgPath: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5 L17.51 6.5 M2 2 h20 v20 h-20 Z'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      colorClass: 'facebook-color',
      svgPath: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      colorClass: 'youtube-color',
      svgPath: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02 L15.5 11.75 L9.75 8.48 L9.75 15.02'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      colorClass: 'twitter-color',
      svgPath: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      colorClass: 'linkedin-color',
      svgPath: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9 h4 v12 h-4 Z M4 4 a2 2 0 1 0 0 -4 a2 2 0 0 0 0 4 Z'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      colorClass: 'pinterest-color',
      svgPath: 'M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z M12 2a10 10 0 0 0-3.16 19.5c0-.07 0-.13-.07-.2-.37-.81-.39-.71-.47-1.3-.07-.51-.36-1.77-.27-2.2.1-.42.62-1.69.29-2.35-.32-.65-1.93-3.12-.86-3.78.3-.2 1.22-.14 1.5-.03.39.17.87.71 1.12.94.25.24.65.32.93.05.47-.4 1.21-.83 1.81-1.11 1.21-.58 3.31-.51 4.41 0 1.46.71 2.42 3.17 3.09 6.22A9.88 9.88 0 0 0 22 12 10 10 0 0 0 12 2z'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      colorClass: 'reddit-color',
      svgPath: 'M12 8c2.23 0 4 1.8 4 4s-1.77 4-4 4-4-1.8-4-4 1.77-4 4-4z M16 8v8 M8 8v8 M12 12h5 M7 12h5 M12 12 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectPlatform(platform: string): void {
    this.selectedPlatform = platform;
    this.platformSelected.emit(platform);
  }
}