import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteativoPesquisaComponent } from './ingredienteativo-pesquisa.component';

describe('IngredienteativoPesquisaComponent', () => {
  let component: IngredienteativoPesquisaComponent;
  let fixture: ComponentFixture<IngredienteativoPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredienteativoPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteativoPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
