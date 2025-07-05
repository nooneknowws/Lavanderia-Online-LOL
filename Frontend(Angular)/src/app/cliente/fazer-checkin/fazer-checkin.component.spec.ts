import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerCheckinComponent } from './fazer-checkin.component';

describe('FazerCheckinComponent', () => {
  let component: FazerCheckinComponent;
  let fixture: ComponentFixture<FazerCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FazerCheckinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazerCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
