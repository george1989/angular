import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstandarRecurso } from 'src/app/models/arquitectura/estandar-recurso.model';
import { EstandarRecursoService } from 'src/app/services/arquitectura/estandar-recurso.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';

@Component({
  selector: 'app-estandar-recurso',
  templateUrl: './estandar-recurso.component.html',
  styleUrls: ['./estandar-recurso.component.css']
})
export class EstandarRecursoComponent implements OnInit {
  @Input() viewMode = false;
  @Input() idEstandar = '';
  @Input() nomEstandar:string = '';
  message = '';

  displayedColumns: string[] = ['id','idEst', 'nombreEre', 'descripcionEre', 'rutaEre', 'tipoEre', 'getDetail', 'getEdit'];
  dataSource = new MatTableDataSource<EstandarRecurso>();
  newEstandarRecurso = {id: "", idEst:this.idEstandar, nombreEre:'', descripcionEre:'', rutaEre:'', tipoEre:''};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<EstandarRecurso>();
  selection = new SelectionModel<EstandarRecurso>(false, []);
  respuestaEstandarRecurso : ERespuesta = new ERespuesta;
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;
 

  constructor(
    private estandarLogicaService: EstandarRecursoService,
    private detalleCatalogoService: DetalleCatalogoService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  
  ngOnInit(): void {
    console.log('Carga EstandarRecurso');
    if (this.viewMode) {
      this.message = '';
      this.getEstandarRecurso(this.idEstandar);
    }
    this.getDetalleCatalogo();
  }
  ngOnChanges(): void
  {
    console.log(this.viewMode);
    if (this.viewMode) {
      this.message = '';
      this.getEstandarRecurso(this.idEstandar);
      
    }

  }

  enablePanel(): void {
    console.log(this.idEstandar);
    if(this.idEstandar=='' || this.idEstandar==null){
      this._snackBar.open('Primero debe seleccionar un catalogo.','OK',{
        duration: 3000
      });
      return;
    }

    this.submitted = false;
    this.tableActive = false;
    this.cleanPanel();
  }
  disablePanel(): void{
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    setTimeout(() => {
      this.newEstandarRecurso = {
        id: "", idEst:this.idEstandar, nombreEre:'', descripcionEre:'', rutaEre:'', tipoEre:''
      };
  }, 100);
}

  getEstandarRecurso(id: string): void {
    if(this.idEstandar==null || this.idEstandar==''){
      return;
    }
    this.dataSource = new MatTableDataSource<EstandarRecurso>();
    this.cleanPanel();
    this.estandarLogicaService.findByidEst(id)
      .subscribe({
        next: (data) => {
          this.respuestaEstandarRecurso = data;
          this.dataSource = new MatTableDataSource <EstandarRecurso> (this.respuestaEstandarRecurso.body);
          console.log(data);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }


  saveEstandarRecurso(): void {   
    console.log(this.newEstandarRecurso.id); 
    if(this.newEstandarRecurso.id==null || this.newEstandarRecurso.id=='')
    {
        this.estandarLogicaService.create(this.newEstandarRecurso)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getEstandarRecurso(this.idEstandar);
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.estandarLogicaService.update(this.newEstandarRecurso.id,this.newEstandarRecurso)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.getEstandarRecurso(this.idEstandar);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });

     }
    }
    
     editEstandarRecurso(item: EstandarRecurso): void{
         this.enablePanel();
         setTimeout(() => {
          this.newEstandarRecurso = {
          id: item.id||'',
          idEst: item.idEst||'', 
          nombreEre: item.nombreEre||'',
          descripcionEre: item.descripcionEre||'',
          rutaEre: item.rutaEre||'',
          tipoEre: item.tipoEre||''
        };
        }, 100);
     }
     createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }
    
    getDetalleCatalogo(): void {
      this.detalleCatalogoService.findByidCat(10)
        .subscribe({
          next: (data) => { 
            this.respuestaCatalogoTipo = data;        
            this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
      }

}
