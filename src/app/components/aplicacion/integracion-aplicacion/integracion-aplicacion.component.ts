import {  AfterViewInit,  Component,  ViewChild,  Input,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  IntegracionAplicacion} from 'src/app/models/aplicacion/integracion-aplicacion.model';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import {  MatTableDataSource} from '@angular/material/table';
import {  SelectionModel} from '@angular/cdk/collections';
import {  Aplicacion} from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { IntegracionAplicacionService } from 'src/app/services/aplicacion/integracion-aplicacion.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-integracion-aplicacion',
  templateUrl: './integracion-aplicacion.component.html',
  styleUrls: ['./integracion-aplicacion.component.css']
})
export class IntegracionAplicacionComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentAplicacion: Aplicacion = {
      nombreApl: '',
      descripcionApl: '',
      estadoApl: ''
  };
  displayedColumns: string[] = ['id','nombreInt','idApl','descripcionInt','tipoInt','aplInt', 'getEdit'];
  dataSource = new MatTableDataSource < IntegracionAplicacion > ();
  newIntegracionAplicacion = {
    id : '',
    nombreInt : '',
    idApl : '',
    descripcionInt : '',
    tipoInt : '',
    aplInt : ''
  };
  submitted = true;
  tableActive = true;
  clickedRows = new Set < IntegracionAplicacion > ();
  selection = new SelectionModel < IntegracionAplicacion > (false, []);
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;
  detalleAplicacion: Aplicacion[] = [];
  respuestaAplicacion : ERespuesta = new ERespuesta;
  respuestaIntegracionAplicacion : ERespuesta = new ERespuesta;

  constructor(
    private _snackBar: MatSnackBar,
    private tecnologiaAplicacionService: IntegracionAplicacionService,
    private detalleCatalogoService: DetalleCatalogoService,
    private aplicacionService: AplicacionService) {}

  ngOnInit(): void {
    console.log('Carga Integracion');
      this.ngCargarTabla();  
      this.getDetalleCatalogo(); 
      this.getAplicacion();  
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
        this.newIntegracionAplicacion = {
          id : '',
          nombreInt : '',
          idApl : this.currentAplicacion.id,
          descripcionInt : '',
          tipoInt : '',
          aplInt : ''
        };
    }, 100);
}

getDetalleCatalogo(): void {
  this.detalleCatalogoService.findByidCat(22)
    .subscribe({
      next: (data) => {
        this.respuestaCatalogoTipo = data;        
        this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
}

  editIntegracionAplicacion(item: IntegracionAplicacion): void {
    this.enablePanel();
      setTimeout(() => {
        this.newIntegracionAplicacion = {
          id : item.id || '',
          nombreInt : item.nombreInt || '',
          idApl : item.idApl || '',
          descripcionInt : item.descripcionInt || '',
          tipoInt : item.tipoInt || '',
          aplInt : item.aplInt || ''
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
                this.respuestaIntegracionAplicacion = data;
                  this.dataSource = new MatTableDataSource < IntegracionAplicacion > (this.respuestaIntegracionAplicacion.body);
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
  }

  saveIntegracionAplicacion(): void {
      console.log(this.newIntegracionAplicacion.id);
      if (this.newIntegracionAplicacion.id == null || this.newIntegracionAplicacion.id == '') {
          this.tecnologiaAplicacionService.create(this.newIntegracionAplicacion)
              .subscribe({
                  next: (res) => {
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {this.createSnackBar(er.error.error.mensaje);}
              });
      } else {
          this.tecnologiaAplicacionService.update(this.newIntegracionAplicacion.id, this.newIntegracionAplicacion)
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
  getAplicacion(): void {
    this.aplicacionService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaAplicacion = data;        
          this.detalleAplicacion = this.respuestaAplicacion.body as Aplicacion[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }

}