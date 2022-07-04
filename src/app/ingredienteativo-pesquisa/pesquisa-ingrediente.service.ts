import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoAnalise } from './../model/grupoanalise';
import { BehaviorSubject } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';

@Injectable({
  providedIn: 'root'
})
export class PesquisaIngredienteService {
	private fixed2 = new BehaviorSubject<any>({id:0,grupoAnalise:"",ingredienteAtivo:"",situacao:"",editar:false,visualizar:false}); // true is your initial value
	fixed2$ = this.fixed2.asObservable();
  
  constructor(private http: HttpClient) { }

  getAllAnalise(): Observable<GrupoAnalise[]>{

      return this.http.get<GrupoAnalise[]>('http://localhost:8081/rada-laboratorios/ingredienteAtivoPesquisa/listarGruposAnalise')
  }

  public  isFixed2(value: any) {
		this.fixed2.next(value);
		console.log('isFixed changed 2 f', value);
	}


}

