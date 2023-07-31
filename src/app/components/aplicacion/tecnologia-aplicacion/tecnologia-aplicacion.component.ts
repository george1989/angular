import {  AfterViewInit,  Component,  ViewChild,  Input,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  TecnologiaAplicacion} from 'src/app/models/aplicacion/tecnologia-aplicacion.model';
import {  AplicacionService} from 'src/app/services/aplicacion/aplicacion.service';
import {  MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource} from '@angular/material/table';
import {  SelectionModel} from '@angular/cdk/collections';
import {  Aplicacion} from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { TecnologiaAplicacionService } from 'src/app/services/aplicacion/tecnologia-aplicacion.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnologia-aplicacion',
  templateUrl: './tecnologia-aplicacion.component.html',
  styleUrls: ['./tecnologia-aplicacion.component.css']
})
export class TecnologiaAplicacionComponent  implements OnInit {
  @Input() viewMode = false;

  @Input() currentAplicacion: Aplicacion = {
      nombreApl: '',
      descripcionApl: '',
      estadoApl: ''
  };
  displayedColumns: string[] = ['id','tecApl','idApl','lenguajeTec','detalleTec','tipoTec', 'getEdit'];
  dataSource = new MatTableDataSource < TecnologiaAplicacion > ();
  newTecnologiaAplicacion = {
    id : '',
    tecApl : '',
    idApl : '',
    lenguajeTec : '',
    detalleTec : '',
    tipoTec : ''
  };
  submitted = true;
  tableActive = true;
  clickedRows = new Set < TecnologiaAplicacion > ();
  selection = new SelectionModel < TecnologiaAplicacion > (false, []);
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  detalleCatalogoLenguaje: DetalleCatalogo[] = [];
  detalleCatalogoTecnologia: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;
  respuestaCatalogoLenguaje : ERespuesta = new ERespuesta;
  respuestaCatalogoTecnologia : ERespuesta = new ERespuesta;
  respuestaTecnologiaAplicacion : ERespuesta = new ERespuesta;

  constructor(
    private _snackBar: MatSnackBar,
    private tecnologiaAplicacionService: TecnologiaAplicacionService,
    private detalleCatalogoService: DetalleCatalogoService) {}

  ngOnInit(): void {
      this.ngCargarTabla();  
      this.getDetalleCatalogo('');   
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
        this.newTecnologiaAplicacion = {
          id : '',
          tecApl : '',
          idApl : this.currentAplicacion.id,
          lenguajeTec : '',
          detalleTec : '',
          tipoTec : ''
        };
    }, 100);
}

getDetalleCatalogo(id: string): void {
  console.log(id);
  this.detalleCatalogoService.findByidCat(14)
    .subscribe({
      next: (data) => {
        this.respuestaCatalogoTipo = data;        
        this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
    this.detalleCatalogoService.findByidCat(12)
      .subscribe({
        next: (data) => { 
          this.respuestaCatalogoTecnologia = data;        
          this.detalleCatalogoTecnologia = this.respuestaCatalogoTecnologia.body as DetalleCatalogo[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
      this.detalleCatalogoService.findByidCat(13)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoLenguaje = data;        
            this.detalleCatalogoLenguaje = this.respuestaCatalogoLenguaje.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
}

  editTecnologiaAplicacion(item: TecnologiaAplicacion): void {
    this.enablePanel();
      setTimeout(() => {
        this.newTecnologiaAplicacion = {
          id : item.id || '',
          tecApl : item.tecApl || '',
          idApl : item.idApl || '',
          lenguajeTec : item.lenguajeTec || '',
          detalleTec : item.detalleTec || '',
          tipoTec : item.tipoTec || ''
        };
    }, 100);
  }

  ngCargarTabla(): void {
    if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
      return;
    }
      this.tecnologiaAplicacionService.findByidApp(this.currentAplicacion.id)
          .subscribe({
              next: (data) => {
                this.respuestaTecnologiaAplicacion = data;
                  this.dataSource = new MatTableDataSource < TecnologiaAplicacion > (this.respuestaTecnologiaAplicacion.body);
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
  }

  saveTecnologiaAplicacion(): void {
      console.log(this.newTecnologiaAplicacion.id);
      if (this.newTecnologiaAplicacion.id == null || this.newTecnologiaAplicacion.id == '') {
          this.tecnologiaAplicacionService.create(this.newTecnologiaAplicacion)
              .subscribe({
                  next: (res) => {
                    this.createSnackBar('Guardado Exitoso.');
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {this.createSnackBar(er.error.error.mensaje);}
              });
      } else {
          this.tecnologiaAplicacionService.update(this.newTecnologiaAplicacion.id, this.newTecnologiaAplicacion)
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

  createSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje,'OK',{
      duration: 2000
    });
  }


}