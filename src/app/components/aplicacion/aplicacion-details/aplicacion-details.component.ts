import {  AfterViewInit,  Component,  ViewChild,  Input,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  DetallesAplicacion} from 'src/app/models/aplicacion/detalles-aplicacion.model';
import {  AplicacionService} from 'src/app/services/aplicacion/aplicacion.service';
import {  MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource} from '@angular/material/table';
import {  SelectionModel} from '@angular/cdk/collections';
import {  Aplicacion} from 'src/app/models/aplicacion/aplicacion.model';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-aplicacion-details',
  templateUrl: './aplicacion-details.component.html',
  styleUrls: ['./aplicacion-details.component.css']
})
export class AplicacionDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentAplicacion: Aplicacion = {
      nombreApl: '',
      descripcionApl: '',
      estadoApl: ''
  };
  displayedColumns: string[] = ['id','detalleCar', 'claveCar', 'valorCar','idApl', 'getEdit'];
  dataSource = new MatTableDataSource < DetallesAplicacion > ();
  newDetallesAplicacion = {
      id: "",
      claveCar: "",
      valorCar: '',
      detalleCar: '',
      idApl: ''
  };
  submitted = true;
  tableActive = true;
  clickedRows = new Set < DetallesAplicacion > ();
  selection = new SelectionModel < DetallesAplicacion > (false, []);
  respuestaDetallesAplicacion : ERespuesta = new ERespuesta;

  constructor(
    private _snackBar: MatSnackBar,
    private aplicacionService: AplicacionService) {}

  ngOnInit(): void {
    console.log('Carga Detalles');
      this.ngCargarTabla();     
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
        this.newDetallesAplicacion = {
            id: '',
            claveCar: '',
            valorCar: '',
            detalleCar: '',
            idApl: this.currentAplicacion.id
        };
    }, 100);
}

  editDetallesAplicacion(item: DetallesAplicacion): void {
    this.enablePanel();
      setTimeout(() => {
        this.newDetallesAplicacion = {
            id: item.id || '',
            detalleCar: item.detalleCar || '',
            claveCar: item.claveCar || '',
            valorCar: item.valorCar || '',
            idApl: item.idApl || ''
        };
    }, 100);
  }

  ngCargarTabla(): void {
    if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
      return;
    }
      this.aplicacionService.findByidApp(this.currentAplicacion.id)
          .subscribe({
              next: (data) => {
                  this.respuestaDetallesAplicacion = data;
                  this.dataSource = new MatTableDataSource<DetallesAplicacion>(this.respuestaDetallesAplicacion.body);
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
  }


  saveDetallesAplicacion(): void {
      if (this.newDetallesAplicacion.id == null || this.newDetallesAplicacion.id == '') {
          this.aplicacionService.createDetalle(this.newDetallesAplicacion)
              .subscribe({
                  next: (res) => {
                    this.createSnackBar('Guardado Exitoso.');
                      this.disablePanel();
                      this.ngCargarTabla();
                  },
                  error: (er) => {this.createSnackBar(er.error.error.mensaje);}
              });
      } else {
          this.aplicacionService.updateDetalle(this.newDetallesAplicacion.id, this.newDetallesAplicacion)
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
    this._snackBar.open('Detalles: '+mensaje,'OK',{
      duration: 2000
    });
  }

}