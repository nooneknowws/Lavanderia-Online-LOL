import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarVooComponent } from './cancelar-voo.component';

describe('CancelarVooComponent', () => {
  let component: CancelarVooComponent;
  let fixture: ComponentFixture<CancelarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelarVooComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
