import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/rrhh/empleado/empleado.model';
import { EmpleadoService } from 'src/app/services/rrhh/empleado/empleado.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreSer', 'ipSer', 'ssoSer', 'detalleSer', 'getEdit'];
  //dataSource : any;
  dataSource = new MatTableDataSource<Empleado>();
  newEmpleado = {
    id: '',
    nombreEmp: '',
    ingresoEmp: '',
    nacimientoEmp: '',
    direccionEmp: '',
    departamentoEmp: ''
  };
  submitted = true;
  tableActive = true;
  respuestaServicio : ERespuesta = new ERespuesta;
  clickedRows = new Set<Empleado>();
  selection = new SelectionModel<Empleado>(false, []);  
  detalleCatalogoDep: DetalleCatalogo[] = [];
  respuestaCatalogoDep : ERespuesta = new ERespuesta;

  constructor(private EmpleadoService: EmpleadoService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {    
    this.getDetalleCatalogo();
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
    this.newEmpleado = {
      id: '',
      nombreEmp: '',
      ingresoEmp: '',
      nacimientoEmp: '',
      direccionEmp: '',
      departamentoEmp: ''
    };
  }, 100);
}



  editEmpleado(item: Empleado): void{
    this.enablePanel();
    setTimeout(() => {
      this.newEmpleado = {id: item.id||'',
      nombreEmp: item.nombreEmp||'',
      ingresoEmp: item.ingresoEmp||'',
      nacimientoEmp: item.nacimientoEmp||'',
      direccionEmp: item.direccionEmp||'',
      departamentoEmp: item.departamentoEmp||''};
    }, 100);
  }

  ngCargarTabla(): void {
    this.EmpleadoService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaServicio = data;
          this.dataSource = new MatTableDataSource<Empleado>(this.respuestaServicio.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }

  saveEmpleado(): void {   
    console.log(this.newEmpleado.id); 
    if(this.newEmpleado.id==null || this.newEmpleado.id=='')
    {
        this.EmpleadoService.create(this.newEmpleado)
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
      this.EmpleadoService.update(this.newEmpleado.id,this.newEmpleado)
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
      this.detalleCatalogoService.findByidCat(7)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoDep = data;        
            this.detalleCatalogoDep = this.respuestaCatalogoDep.body as DetalleCatalogo[];
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

