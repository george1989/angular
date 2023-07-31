import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HitoRequerimiento } from 'src/app/models/arquitectura/hito-requerimiento.model';
import { TareaRequerimiento } from 'src/app/models/arquitectura/tarea-requerimiento.model';
import { TareaRequerimientoService } from 'src/app/services/arquitectura/tarea-requerimiento.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { HitoRequerimientoService } from 'src/app/services/arquitectura/hito-requerimiento.service';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { DocumentacionArquitectura } from 'src/app/models/documentacion/documentacion-arquitectura.model';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarea-requerimiento',
  templateUrl: './tarea-requerimiento.component.html',
  styleUrls: ['./tarea-requerimiento.component.css']
})
export class TareaRequerimientoComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentHito: HitoRequerimiento = {
    id: '',
  };


  displayedColumns: string[] = ['id','integranteTar','tareaTar','idHit', 'getEdit'];
  dataSource = new MatTableDataSource<TareaRequerimiento>();
  newTareaRequerimiento = {id: "", integranteTar: "", tareaTar: "", idHit: ""};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<TareaRequerimiento>();
  selection = new SelectionModel<TareaRequerimiento>(false, []);
  detalleHitoRequerimiento: HitoRequerimiento[] = [];
  respuestaHitoRequerimiento: ERespuesta = new ERespuesta;
  respuestaTareaRequerimiento: ERespuesta = new ERespuesta;
  detalleCatalogoIntegrante: DetalleCatalogo[] = [];
  respuestaCatalogoIntegrante: ERespuesta = new ERespuesta
  
  constructor(
    private tareaRequerimientoService: TareaRequerimientoService,
    private _snackBar: MatSnackBar,
    private hitoRequerimientoService: HitoRequerimientoService,
    private detalleCatalogoService: DetalleCatalogoService
    ) { }

  ngOnInit(): void {  
    console.log('Carga TareaRequerimiento'); 
    this.getAplicacion();
    this.ngCargarTabla();
    this.getDetalleCatalogo();

  }
  ngCargarTabla(){
    this.dataSource = new MatTableDataSource<TareaRequerimiento>();
      if(this.currentHito.id!= null && this.currentHito.id!= '')
        {
          this.getTareaRequerimientoAplicacion();
        }
  }

  ngOnChanges(): void {
      this.ngCargarTabla();
  }
 
  enablePanel(): void {
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
      this.newTareaRequerimiento = {
          id: "", 
          integranteTar: "", 
          tareaTar: "", 
          idHit: this.currentHito.id,
        };
  }, 100);
}

  editTareaRequerimiento(item: TareaRequerimiento): void{
    this.enablePanel();
    setTimeout(() => {
      this.newTareaRequerimiento = {
        id: item.id||'', 
        integranteTar: item.integranteTar||'', 
        tareaTar: item.tareaTar||'', 
        idHit: item.idHit||''
      };
    }, 100);
  }

    getTareaRequerimientoAplicacion(): void {
      this.tareaRequerimientoService.findByidHito(this.currentHito.id)
        .subscribe({
          next: (data) => {
            this.respuestaTareaRequerimiento = data;
            this.dataSource = new MatTableDataSource<TareaRequerimiento>(this.respuestaTareaRequerimiento.body);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
      }

  saveTareaRequerimiento(): void {   
    if(this.newTareaRequerimiento.id==null || this.newTareaRequerimiento.id=='')
    {
        this.tareaRequerimientoService.create(this.newTareaRequerimiento)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel()
              this.ngCargarTabla();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.tareaRequerimientoService.update(this.newTareaRequerimiento.id,this.newTareaRequerimiento)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.ngCargarTabla();
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
     }
    }


    getDetalleCatalogo(): void {
      this.detalleCatalogoService.findByidCat(21)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoIntegrante = data;        
            this.detalleCatalogoIntegrante = this.respuestaCatalogoIntegrante.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
    }
    getAplicacion(): void {
      this.hitoRequerimientoService.getAll()
        .subscribe({
          next: (data) => {
            this.respuestaHitoRequerimiento = data;        
            this.detalleHitoRequerimiento = this.respuestaHitoRequerimiento.body as Aplicacion[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
    }

    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }
  }

