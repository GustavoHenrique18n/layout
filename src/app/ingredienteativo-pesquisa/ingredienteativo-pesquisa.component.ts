import { GrupoAnalise } from './../model/grupoanalise';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsService} from '../forms.service';
import { HttpService } from '../services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PesquisaIngredienteService } from './pesquisa-ingrediente.service';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';


import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
export interface IngredienteAtivo {
  ativo:string;
  codIngredienteAtivo: number,
  dsComplemento: string,
  dsIngredienteAtivo: string,
  idIngredienteAtivo: number,
  tipoIngredienteAtivo:string
}



const dados:IngredienteAtivo[] =[];

@Component({
  selector: 'app-ingredienteativo-pesquisa',
  templateUrl: './ingredienteativo-pesquisa.component.html',
  styleUrls: ['./ingredienteativo-pesquisa.component.css']
})
export class IngredienteativoPesquisaComponent implements OnInit {
  pesquisar: any = []
  pesquisado = false;
  valoresParaFiltro: any;
  grupos: GrupoAnalise[] = [];
  @Output() cadastroTab: EventEmitter<any> = new EventEmitter();


  filtroStatus = new FormControl();
  filtroComplemento =new FormControl();
  filtroDescricao = new FormControl();
  globalFilter = '';

  valoresFiltros = {
    dsComplemento: '', 
    dsIngredienteAtivo: '',
    ativo: ''
  };


  //displayedColumns: string[] = ['id', 'ingredienteativo', 'descricao', 'situacao'];
  //dataSource  = ELEMENT_DATA;
  displayedColumns: string[] = ['codIngredienteAtivo', 'dsIngredienteAtivo','dsComplemento', 'tipoIngredienteAtivo', 'ativo'];
  dataSource: any = [];

  visualizar: boolean = false;
  ingredientes:any = [];
  ingredientesFiltrados:any = [];

  todos: any = []


  form!: FormGroup;
  appForm!: FormGroup; /*  */


  

  foreignKeys  = {
    id : 0,
    idIngredienteAtivo: 0
  }

  ingredienteativo: string = '';
  filtros = [];
 
 

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private formService:PesquisaIngredienteService,
    
    public dialog:MatDialog) { 

      this.appForm = this.formBuilder.group({
        codIngredienteAtivo: [''],
        dsComplemento: [''],
        dsIngredienteAtivo: [''],
        tipoIngredienteAtivo: [''],
        ativo: ['']
      });
}


  customFilterPredicate() {
    const myFilterPredicate = (data: IngredienteAtivo, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.dsIngredienteAtivo.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.dsIngredienteAtivo.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
      /* &&
        (this.levelsToShow.filter(level => !level.active).length === this.levelsToShow.length ||
          this.levelsToShow.filter(level => level.active).some(level => level.level === data.level));*/
    }
    return myFilterPredicate;
  }

  updateFilter() {
    this.dataSource.filter = JSON.stringify(this.valoresFiltros);
  }








  

  ngOnInit() {

    this.filtroDescricao.valueChanges.subscribe((valorFiltroDescricao) => {
      this.valoresFiltros['dsIngredienteAtivo'] = valorFiltroDescricao;
      this.dataSource.filter = JSON.stringify(this.valoresFiltros);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();



  this.getIngredientesAtivos()
  //this.getIngredientes()
  this.ingredientesFiltrados = this.appForm.get('ingredienteativo')?.valueChanges.pipe(
    startWith(''),
    map(value => this.filtrandoValores(value || '')),
  );


  this.http.get<any>(`${environment.Api}/rada-laboratorios/ingredienteAtivo/listarIngredienteAtivo`)
  .subscribe(
   (resultado:any)=> {
    console.log('pesquisa',resultado)
     const result = resultado.map((item:any)=>{
      return {item,
                codIngredienteAtivo: item.codIngredienteAtivo,
                ativo:item.ativo.toString() ,
                dsComplemento:item.dsComplemento,
                dsIngredienteAtivo:item.dsIngredienteAtivo ,
                tipoIngredienteAtivo:item.tipoIngredienteAtivo,
                }
     })
      this.valoresParaFiltro = result
      this.dataSource = result
      console.log(result)
      this.pesquisado= true;

    },
    erro => {
    }
  );


  }


  reiniciarPesquisa(){
    this.http.get<any>('http://localhost:8081/rada-laboratorios/ingredienteAtivo/listarIngredienteAtivo')
    .subscribe(
     (resultado:any)=> {
      console.log('pesquisa',resultado)
       const result = resultado.map((item:any)=>{
        return {item,
                  codIngredienteAtivo: item.codIngredienteAtivo,
                  ativo:item.ativo.toString() ,
                  dsComplemento:item.dsComplemento,
                  dsIngredienteAtivo:item.dsIngredienteAtivo ,
                  tipoIngredienteAtivo:item.tipoIngredienteAtivo,
                  }
       })
        this.valoresParaFiltro = result
        this.dataSource = result
        console.log(result)
        this.pesquisado= true;
  
      },
      erro => {
      }
    );
  }

  falso(){
    return false;
  }
  buscarDados(){

    if(this.appForm.valid){

      this.updateFilter();

      /*this.filtroStatus = false;
      this.filtroComplemento = false;
      this.filtroDescricao = false;
      if(this.appForm.get('ativo')?.value != '' && this.appForm.get('ativo')?.value != null) {
        this.filtroStatus = true;
        this.dataSource.filter = this.appForm.get('ativo').value.trim().toLowerCase();
      }
      if(this.appForm.get('dsComplemento')?.value != "" && this.appForm.get('dsComplemento')?.value != null){
        this.filtroComplemento = true;
        this.dataSource.filter = this.appForm.get('dsComplemento').value.trim().toLowerCase();
      }
      if(this.appForm.get('dsIngredienteAtivo')?.value != '' && this.appForm.get('dsIngredienteAtivo')?.value != null){
        this.filtroDescricao = true;
        this.dataSource.filter = this.appForm.get('dsIngredienteAtivo').value.trim().toLowerCase();
      }*/
      

     
      /*const dadosFiltrados = this.dataSource.filter((item:any)=>{
        
        if(this.filtroStatus||this.filtroComplemento||this.filtroDescricao){
          if(this.filtroStatus){
            item.situacao == this.appForm.get('situacao')?.value;
            dados.push(item);
          }
          if (this.filtroComplemento){
            if(item.dsComplemento != null && item.dsComplemento!= ''){
            if(item.dsComplemento.toLowerCase() == this.appForm.get('dsComplemento').value.trim().toLowerCase()){
              dados.push(item);
            }
            
          }
          }
          if (this.filtroDescricao){
            if(item.dsComplemento != null && item.dsComplemento!= ''){
            if(item.dsIngredienteAtivo.toLowerCase() == this.appForm.get('dsComplemento').value.trim().toLowerCase()){
              dados.push(item);
            }
           
            }
          }
          dados.push(item);
        }else{
          this.pesquisado = true;
          this.reiniciarPesquisa();
          return item;
        }
        return item;
      })
      
      
      this.dataSource = dadosFiltrados;*/
  
      //console.log('dadosFiltrados', dadosFiltrados);
      console.log('dados', dados);
  
      
  
    }else {
  
      console.log('ERRO ERRO ERRO')
  
       Object.keys(this.appForm.controls).forEach(field => {
        const control = this.appForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
  
  
  
    }
  
  }


  buscarDados2(){
    if(this.appForm.valid){
      this.dataSource = this.valoresParaFiltro
      const dadosFiltrados = this.dataSource.filter((item:any)=>{
        if(this.appForm.get('ativo')?.value != null){
          if(item.dsComplemento != null && item.aivo != null){
            if(item.ativo == this.appForm.get('ativo')?.value){
              if(item.dsComplemento.includes(this.appForm.get('dsComplemento')?.value)){
                this.pesquisado = true
                return item
              }
            }
          }
        }else {
          if(item.dsComplemento){
            if(item.dsComplemento.includes(this.appForm.get('dsComplemento')?.value)){
              this.pesquisado = true
              return item
            }
          }
        }
  
      })
      this.dataSource = dadosFiltrados
    }else {
      Object.keys(this.appForm.controls).forEach(field => {
        const control = this.appForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  
  }



  getIngredientesAtivos() {

    this.http
      .get<any>(
        'http://localhost:8081/rada-laboratorios/ingredienteAtivo/listarIngredienteAtivo'
      )
      .subscribe(
        (res: any) => {

          
          this.ingredientes = res;
        },
        (error) => {
          console.log({ error });
        }
      );
  }

  getIngredientes() {
    this.http
      .get<any>(
        'http://localhost:8081/rada-laboratorios/ingredienteAtivo/listarGrupoIngredienteAtivo'
      )
      .subscribe(
        (res: any) => {
          const nomeIngredientes = res.map((item:any)=> {
              return {id:item.ingredienteAtivo.idIngredienteAtivo, nomeIngrediente:item.ingredienteAtivo.dsIngredienteAtivo}
          })
          console.log(nomeIngredientes)
          this.ingredientes = nomeIngredientes;
        },
        (error) => {
          console.log({ error });
        }
      );
  }

  limpar(){
    this.pesquisado = false
    this.appForm.reset()
  }
  novo(){
    this.cadastroTab.emit(1)
  }
  deletar(id:any,situacao:string){
    if(situacao == "true"){
      this.openDialog(situacao,id)
    }else{
      return;
    }
  }
  editar(id:any, grupoAnalise:any,ingredienteAtivo:any,idIngredienteAtivo:any,situacao:any){
    this.formService.isFixed2({id,grupoAnalise,ingredienteAtivo,idIngredienteAtivo,situacao,editar:true});
    this.novo()
  }
  
  visualizar2(grupoAnalise:any,ingredienteAtivo:any,situacao:any){
    this.formService.isFixed2({grupoAnalise,ingredienteAtivo,situacao,visualizar:true});
    this.novo()
  }
  
  openDialog(situacao:string,id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width:'auto',
      data: {
        situacao,
       // source:this.dataSource,
        id
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      null;
      //const dataSource = result
    });
  }
  
  validar(field:any){
    return this.appForm.get(field)?.hasError('required')
  }
  
  filtrandoValores(value:any){
    const filterValue = value.toLowerCase();
    return this.ingredientes.filter((item:any) => item.nomeIngrediente.toLowerCase().includes(filterValue));
  }
  
  set(value:any , field:string){
    if(field == "grupo"){
      this.foreignKeys.id = value
    }else{
      this.foreignKeys.idIngredienteAtivo = value
    }
  }


}
