import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSelectionComponent } from './platform-selection.component';

describe('PlatformSelectionComponent', () => {
  let component: PlatformSelectionComponent;
  let fixture: ComponentFixture<PlatformSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
