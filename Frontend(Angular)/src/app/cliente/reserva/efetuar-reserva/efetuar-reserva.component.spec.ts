import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetuarReservaComponent } from './efetuar-reserva.component';

describe('EfetuarReservaComponent', () => {
  let component: EfetuarReservaComponent;
  let fixture: ComponentFixture<EfetuarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EfetuarReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfetuarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});