import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Analises {
  id: number,
  grupoDeAnalise: string,
  descricao: string,
  situacao: string
}
 
@Injectable()
export class HttpService {
  
  post<T>(arg0: string, pessoacpf: any): Observable<any> {
      // throw new Error('Method not implemented.');
      return this.httpClient.post<any>(arg0,pessoacpf, { responseType: "json" })
  }
  put<T>(arg0: string, pessoacpf: any): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.httpClient.put<any>(arg0,pessoacpf)
  }
  constructor(private httpClient: HttpClient) {}

  public get<Type>(url: string): Observable<Type> {
    return this.httpClient.get<Type>(url, { responseType: "json" });
  }

  getAnalise(): Observable<Analises[]> {
    return this.httpClient.get<any>('http://localhost:8081/rada-laboratorios/grupoAnalise/listarGruposAnalise')
  }
}
