import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerSkeletonComponent } from './shimmer-skeleton.component';

describe('ShimmerSkeletonComponent', () => {
  let component: ShimmerSkeletonComponent;
  let fixture: ComponentFixture<ShimmerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShimmerSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShimmerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
