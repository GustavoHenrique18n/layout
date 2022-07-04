import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoDeColetaComponent } from './termodecoleta-cadastro.component';

describe('TermoDeColetaComponent', () => {
  let component: TermoDeColetaComponent;
  let fixture: ComponentFixture<TermoDeColetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoDeColetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoDeColetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
