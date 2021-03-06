import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../model/client';

import { HttpService } from './http.service';

const host = "localhost:8081";
interface CepEnderecoPessoa {
    idCep: number;
    numeroCep: string;
    nomeLogradouro: string;
    nomeBairro: string;
    municipio: string;
    ativo: boolean;
}

interface EnderecoPessoa {
    idEndereco: number;
    nomeLogradouro: string;
    nomeBairro: string;
    cep: CepEnderecoPessoa
    numeroEndereco: string;
    correspondencia: boolean;


}
interface Pessoa {
    idPessoa: number;
    endereco: EnderecoPessoa;
    nomePessoa: string;
    tipoPessoa: "F";
    numeroCpfCnpj: string;
    nomeFantasiaOrApelido: string;

}


interface Campos {
    numeroCpfCnpj: string;
    nomeprodutor: string;
    nomefantasia: string;
    cep: string;
    enderenço: string;
    numero: string;
    complemento: string;
    bairoo: string;
    municipio: string;
    estado: string;
    registroima: string;

}

interface Masp1 {
    idPessoa: string;
    nomePessoa: string;
    tipoPessoa: "F";
    nunMaspOuRegInstituicaoConveniada: number;
    indentificador: string;
    idPapel: string;
    usuario: {
        usuarioLocalizacaoList: {
            idUsuarioLocalizacao: number | string
            localizacao: any
            responsavelLocalizacao: boolean
            estrutura: any
            papel: {
                idPapel: number
                nome: string
                identificador: string
                conditional: boolean
                dtAtualizaca: number
                dtEnvioContingencia: any | null
                ativo: boolean
            }
        }[]
    }

}

            interface acao1{
                dataHoraAcao:Date;
                nomeLocal:string;
                acaoTermo:string;
                idLocalSidrago:number;
                quantidadeAmostra:number;
                tipoLocal:string               




            }
interface termoSalvar {
    idPessoa: string;
    nomePessoa: string;
    tipoPessoa: "F";
    nunMaspOuRegInstituicaoConveniada: number;
    indentificador: string;
    idPapel: string;
    usuario: {
        usuarioLocalizacaoList: {
            idUsuarioLocalizacao: number | string
            localizacao: any
            responsavelLocalizacao: boolean
            estrutura: any
            papel: {
                idPapel: number
                nome: string
                identificador: string
                conditional: boolean
                dtAtualizaca: number
                dtEnvioContingencia: any | null
                ativo: boolean
            }
        }[]
    }

}


@Injectable({
    providedIn: 'root'
})
export class ConsultaPessoaService {
    getPessoacpf(Pessoacpf: any) {
        throw new Error('Method not implemented.');
    }
    storeClient(client: Client) {
        throw new Error('Method not implemented.');
    }


    constructor(private http: HttpService) { }

	private fixed2 = new BehaviorSubject<any>({}); // true is your initial value
	fixed2$ = this.fixed2.asObservable();

	public  isFixed2(value: any) {
		this.fixed2.next(value);
		console.log('isFixed changed', value);
	}

    data = {
        name: 'Eu',
        age: 19
    }

    public storeData() {
        const json = JSON.stringify(this.data)

        localStorage.setItem('data', json)
    }

    public async verifyData() {
        const localData = localStorage.getItem('data')
        if (!localData) throw new Error('No local data found')

        const { name, age } = JSON.parse(localData)
        if (!name || !age) return false
        return true
    }

    public getPessoa(cpfCnpj: string) {
        return this.http.get<Pessoa>(`${environment.Api}/rada-laboratorios/pessoa/buscarPorCpfCnpj/${cpfCnpj}`);
        
    }
    public postPessoaenvolvidos(termoSalvar: string) {
        return this.http.post<termoSalvar>(`${environment.Api}/rada-laboratorios/termoColetaEnvolvidos/gravar`, termoSalvar);       
    }


    public postPessoacpf(pessoacpf: string) {
         return this.http.post<Campos>(`${environment.Api}/rada-laboratorios/termoColeta/gravarTermoColeta`, pessoacpf)
    }

    public getPessoamasp(numeromasp: string) {
        return this.http.get<Masp1>(`${environment.Api}/rada-laboratorios/pessoa/buscarPorMasp/${numeromasp}`);
        
        
    }

    public getCultura() {
        return this.http.get<any>(`${environment.Api}/rada-laboratorios/cultura/listarCulturasAtivas `);
        
        
    }

    public getVariedadePelaCultura(culturaId:any) {
         return this.http.get<any>(`${environment.Api}/rada-laboratorios/cultura/listarVariedadesPorIdCultura/${culturaId} `);
        
       
    }
    public postacao(acao: string){
        return this.http.post<acao1>(`${environment.Api}/rada-laboratorios/termoColetaAcao/gravar`, acao);
        


    }
    public envolvidos(acao: string){
        return this.http.post<any>(`${environment.Api}/rada-laboratorios/termoColetaEnvolvidos/gravar`, acao);
        
    }

   

}





