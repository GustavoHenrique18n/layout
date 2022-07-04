import { TestBed } from '@angular/core/testing';

import { PesquisaIngredienteService } from './pesquisa-ingrediente.service';

describe('PesquisaIngredienteService', () => {
  let service: PesquisaIngredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaIngredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
