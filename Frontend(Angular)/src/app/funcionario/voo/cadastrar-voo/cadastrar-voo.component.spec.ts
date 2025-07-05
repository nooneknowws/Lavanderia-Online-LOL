import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVooComponent } from './cadastrar-voo.component';

describe('CadastrarVooComponent', () => {
  let component: CadastrarVooComponent;
  let fixture: ComponentFixture<CadastrarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarVooComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
