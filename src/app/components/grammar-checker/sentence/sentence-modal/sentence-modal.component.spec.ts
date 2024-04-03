import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceModalComponent } from './sentence-modal.component';

describe('SentenceModalComponent', () => {
  let component: SentenceModalComponent;
  let fixture: ComponentFixture<SentenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentenceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
