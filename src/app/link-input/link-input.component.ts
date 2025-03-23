import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-link-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss']
})
export class LinkInputComponent implements OnChanges {
  @Input() selectedPlatform: string = 'tiktok';
  @Output() linkChanged = new EventEmitter<string>();
  
  linkControl = new FormControl('');
  placeholder: string = '';
  
  private placeholders = {
    tiktok: "z.B. https://vm.tiktok.com/ZNdRe7n6d/",
    instagram: "z.B. https://www.instagram.com/reel/DHZ4zj3Nk8N/?igsh=MWY3c2R6N2hoeWQ3Nw==",
    facebook: "z.B. https://www.facebook.com/watch/?v=12345678&fbclid=xyz123",
    youtube: "z.B. https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share",
    twitter: "z.B. https://twitter.com/username/status/123456789?s=20&t=abcdefg",
    linkedin: "z.B. https://www.linkedin.com/posts/username_topic-activity-1234567890-abcd",
    pinterest: "z.B. https://pin.it/abcdef123 oder https://www.pinterest.com/pin/...",
    reddit: "z.B. https://www.reddit.com/r/subreddit/comments/abc123/title/?utm_source=share"
  };
  
  constructor() { 
    this.linkControl.valueChanges.subscribe(value => {
      this.linkChanged.emit(value || '');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPlatform']) {
      this.updatePlaceholder();
    }
  }
  
  private updatePlaceholder(): void {
    this.placeholder = this.placeholders[this.selectedPlatform as keyof typeof this.placeholders] || 
                      "Social Media Link hier einfügen...";
  }
}