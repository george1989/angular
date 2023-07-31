import { Component, Input, OnInit, Inject } from '@angular/core';
import { ComponenteAplicacion } from 'src/app/models/aplicacion/componente-aplicacion.model';
import { ComponenteAplicacionService } from 'src/app/services/aplicacion/componente-aplicacion.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';

@Component({
  selector: 'app-componente-aplicacion',
  templateUrl: './componente-aplicacion.component.html',
  styleUrls: ['./componente-aplicacion.component.css']
})
export class ComponenteAplicacionComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentAplicacion: Aplicacion = {
      nombreApl: '',
      descripcionApl: '',
      estadoApl: '',
  };
  selection = new SelectionModel < ComponenteAplicacion > (false, []);
  displayedColumns: string[] = ['id', 'nombreCom', 'tipoCom', 'idApl', 'descripcionCom', 'getDetalle', 'getEdit'];
  dataSource = new MatTableDataSource < ComponenteAplicacion > ();
  respuestaComponenteAplicacion: ERespuesta = new ERespuesta;
  submitted = true;
  tableActive = true;
  maestro = true;
  detalle = false;
  catalogo ? : ComponenteAplicacion[];
  currentComponenteAplicacion: ComponenteAplicacion = {};
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;
  title = '';
  newComponenteAplicacion = {
      id: "",
      nombreCom: "",
      tipoCom: "",
      idApl: "",
      descripcionCom: ""
  };

  constructor(
    private detalleCatalogoService: DetalleCatalogoService,
    private componenteAplicacion: ComponenteAplicacionService,
      private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
      console.log('Carga Infraestructura');
      this.ngCargarTabla();
      this.getDetalleCatalogo();
  }

  ngOnChanges(): void{
    this.ngCargarTabla();
  }
  enablePanel(): void {
      this.submitted = false;
      this.tableActive = false;
      this.cleanPanel();
  }
  disablePanel(): void {
      this.submitted = true;
      this.tableActive = true;
      this.cleanPanel();
  }

  cleanPanel(): void {
      this.newComponenteAplicacion = {
          id: "",
          nombreCom: "",
          tipoCom: "",
          idApl: this.currentAplicacion.id,
          descripcionCom: ""
      };
  }


  editComponenteAplicacion(item: ComponenteAplicacion): void {
      this.enablePanel();
      setTimeout(() => {
          this.newComponenteAplicacion = {
              id: item.id || '',
              nombreCom: item.nombreCom || '',
              tipoCom: item.tipoCom || '',
              idApl: item.idApl || '',
              descripcionCom: item.descripcionCom || ''

          };
      }, 100);


  }
  ngCargarTabla(): void {
    if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
        return;
      }
      this.componenteAplicacion.findByidApl(this.currentAplicacion.id)
          .subscribe({
              next: (data) => {
                  this.respuestaComponenteAplicacion = data;
                  this.dataSource = new MatTableDataSource < ComponenteAplicacion > (this.respuestaComponenteAplicacion.body);
              },
              error: (er) => {
                  this.createSnackBar(er.error.error.mensaje);
              }
          });
  }
  refreshList(): void {
      this.ngCargarTabla();
      this.currentComponenteAplicacion = {};
  }

  setActiveAplicacion(catalogo: ComponenteAplicacion): void {
      this.currentComponenteAplicacion = catalogo;
      this.maestro = false;
      this.detalle = true;
  }
  setActiveComponente(): void {
    this.maestro = true;
    this.detalle = false;
}
  saveComponenteAplicacion(): void {
      if (this.newComponenteAplicacion.id == null || this.newComponenteAplicacion.id == '') {
          this.componenteAplicacion.create(this.newComponenteAplicacion)
              .subscribe({
                  next: (res) => {
                      this.createSnackBar('Guardado Exitoso.');
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {
                      this.createSnackBar(er.error.error.mensaje);
                  }
              });
      } else {
          this.componenteAplicacion.update(this.newComponenteAplicacion.id, this.newComponenteAplicacion)
              .subscribe({
                  next: (res) => {
                      this.createSnackBar('Guardado Exitoso.');
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {
                      this.createSnackBar(er.error.error.mensaje);
                  }
              });

      }
  }
  getDetalleCatalogo(): void {
    this.detalleCatalogoService.findByidCat(19)
      .subscribe({
        next: (data) => {
          this.respuestaCatalogoTipo = data;        
          this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }
  createSnackBar(mensaje: string): void {
      this._snackBar.open('Componentes: '+mensaje, 'OK', {
          duration: 2000
      });
  }
}