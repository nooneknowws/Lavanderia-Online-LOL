import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEmbarqueComponent } from './confirmar-embarque.component';

describe('ConfirmarEmbarqueComponent', () => {
  let component: ConfirmarEmbarqueComponent;
  let fixture: ComponentFixture<ConfirmarEmbarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEmbarqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
