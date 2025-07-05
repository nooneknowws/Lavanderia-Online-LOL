import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheReservaComponent } from './detalhe-reserva.component';

describe('DetalheReservaComponent', () => {
  let component: DetalheReservaComponent;
  let fixture: ComponentFixture<DetalheReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalheReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
