import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-link-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss']
})
export class LinkInputComponent {
  @Output() linkChanged = new EventEmitter<string>();
  
  linkControl = new FormControl('');
  placeholder: string = "Paste your social media link here...";
  
  constructor() { 
    this.linkControl.valueChanges.subscribe(value => {
      this.linkChanged.emit(value || '');
    });
  }
}