import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarVooComponent } from './realizar-voo.component';

describe('RealizarVooComponent', () => {
  let component: RealizarVooComponent;
  let fixture: ComponentFixture<RealizarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizarVooComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
