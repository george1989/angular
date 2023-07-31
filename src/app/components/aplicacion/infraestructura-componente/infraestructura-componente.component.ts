import {  AfterViewInit,  Component,  ViewChild,  Input,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  InfraestructuraComponente} from 'src/app/models/aplicacion/infraestructura-componente.model';
import {  ComponenteAplicacion} from 'src/app/models/aplicacion/componente-aplicacion.model';
import {  AplicacionService} from 'src/app/services/aplicacion/aplicacion.service';
import {  MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource} from '@angular/material/table';
import {  SelectionModel} from '@angular/cdk/collections';
import {  Aplicacion} from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { InfraestructuraComponenteService } from 'src/app/services/aplicacion/infraestructura-componente.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-infraestructura-componente',
  templateUrl: './infraestructura-componente.component.html',
  styleUrls: ['./infraestructura-componente.component.css']
})
export class InfraestructuraComponenteComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentComponenteAplicacion: ComponenteAplicacion = {
    nombreCom: '',
      descripcionCom: '',
      tipoCom: ''
  };
  displayedColumns: string[] = ['id','ambienteIco','idCom','rutaIco','detalleIco', 'getEdit'];
  dataSource = new MatTableDataSource < InfraestructuraComponente > ();
  newInfraestructuraComponente = {
    id : '',
    ambienteIco : '',
    idCom : '',
    rutaIco : '',
    detalleIco : ''
  };
  submitted = true;
  tableActive = true;
  clickedRows = new Set < InfraestructuraComponente > ();
  selection = new SelectionModel < InfraestructuraComponente > (false, []);
  detalleCatalogoAmbiente: DetalleCatalogo[] = [];
  respuestaCatalogoAmbiente : ERespuesta = new ERespuesta;
  respuestaInfraestructuraComponente : ERespuesta = new ERespuesta;

  constructor(
    private _snackBar: MatSnackBar,
    private tecnologiaAplicacionService: InfraestructuraComponenteService,
    private detalleCatalogoService: DetalleCatalogoService) {}

  ngOnInit(): void {
    console.log('Carga Infra Componente');
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
        this.newInfraestructuraComponente = {
          id : '',
          ambienteIco : '',
          idCom : this.currentComponenteAplicacion.id,
          rutaIco : '',
          detalleIco : ''
        };
    }, 100);
}

getDetalleCatalogo(id: string): void {
  console.log(id);
  this.detalleCatalogoService.findByidCat(6)
    .subscribe({
      next: (data) => {
        this.respuestaCatalogoAmbiente = data;        
        this.detalleCatalogoAmbiente = this.respuestaCatalogoAmbiente.body as DetalleCatalogo[];
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
}

  editInfraestructuraComponente(item: InfraestructuraComponente): void {
    this.enablePanel();
      setTimeout(() => {
        this.newInfraestructuraComponente = {
          id : item.id || '',
          ambienteIco : item.ambienteIco || '',
          idCom : item.idCom || '',
          rutaIco : item.rutaIco || '',
          detalleIco : item.detalleIco || '',
        };
    }, 100);
  }

  ngCargarTabla(): void {
    this.dataSource = new MatTableDataSource < InfraestructuraComponente > ();
    if(this.currentComponenteAplicacion.id=='' || this.currentComponenteAplicacion.id==null){
      return;
    }
      this.tecnologiaAplicacionService.findByidCom(this.currentComponenteAplicacion.id)
          .subscribe({
              next: (data) => {
                this.respuestaInfraestructuraComponente = data;
                  this.dataSource = new MatTableDataSource < InfraestructuraComponente > (this.respuestaInfraestructuraComponente.body);
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
  }

  saveInfraestructuraComponente(): void {
      console.log(this.newInfraestructuraComponente.id);
      if (this.newInfraestructuraComponente.id == null || this.newInfraestructuraComponente.id == '') {
          this.tecnologiaAplicacionService.create(this.newInfraestructuraComponente)
              .subscribe({
                  next: (res) => {
                    this.createSnackBar('Guardado Exitoso.');
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {this.createSnackBar(er.error.error.mensaje);}
              });
      } else {
          this.tecnologiaAplicacionService.update(this.newInfraestructuraComponente.id, this.newInfraestructuraComponente)
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