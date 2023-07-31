import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfraestructuraAplicacion } from 'src/app/models/aplicacion/infraestructura-aplicacion.model';
import { InfraestructuraAllAplicacion } from 'src/app/models/aplicacion/infraestructura-all-aplicacion.model';
import { InfraestructuraAplicacionService } from 'src/app/services/aplicacion/infraestructura-aplicacion.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {  Aplicacion} from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { Servidor } from 'src/app/models/servidor.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-infraestructura-aplicacion',
  templateUrl: './infraestructura-aplicacion.component.html',
  styleUrls: ['./infraestructura-aplicacion.component.css']
})
export class InfraestructuraAplicacionComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentAplicacion: Aplicacion = {
      nombreApl: '',
      descripcionApl: '',
      estadoApl: ''
  };  
  detalleCatalogoAmbiente: DetalleCatalogo[] = [];
  respuestaCatalogoAmbiente : ERespuesta = new ERespuesta;
  respuestaInfraestructuraAllAplicacion: ERespuesta = new ERespuesta;
  detalleCatalogoSer: Servidor[] = [];
  respuestaServidor: ERespuesta = new ERespuesta;
  displayedColumns: string[] = ['ico','id','nombreDet','rutaInf', 'detalleInf','idSer','ambienteInf','nombreSer','detalleSer','ipSer','ssoSer','idApl','nombreApl', 'getEdit'];
  dataSource = new MatTableDataSource<InfraestructuraAllAplicacion>();
  newInfraestructuraAplicacion = {id: "", ambienteInf: "", idSer:'', idApl:'', rutaInf:'', detalleInf:''};
  submitted = true;
  tableActive = true;
  selection = new SelectionModel<InfraestructuraAllAplicacion>(false, []);

  constructor(
    private _snackBar: MatSnackBar,
    private infraestructuraAplicacionService: InfraestructuraAplicacionService,
    private aplicacionService: AplicacionService,
    public dialog: MatDialog,
    private detalleCatalogoService: DetalleCatalogoService,
    private servidorService:ServidorService) { }

  ngOnInit(): void { 
    console.log('Carga Infraestructura');
    this.getDetalleCatalogo('0');
    this.getServidor();
    this.ngCargarTabla();
  }

  ngOnChanges(): void{
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
      this.newInfraestructuraAplicacion = {
          idApl: this.currentAplicacion.id,
          id: '', 
          ambienteInf: '', 
          idSer:'', 
          rutaInf:'', 
          detalleInf: ''
      };
  }, 100);
    };


  editInfraestructuraAplicacion(item: InfraestructuraAllAplicacion): void{

      this.enablePanel();
      setTimeout(() => {
      this.newInfraestructuraAplicacion = {
        id: item.id||'', 
        ambienteInf: item.ambienteInf||'', 
        idSer:item.idSer||'', 
        idApl:item.idApl||'', 
        rutaInf:item.rutaInf||'', 
        detalleInf:item.detalleInf||''};
      }, 100);
  }

    ngCargarTabla(): void {
      if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
        return;
      }
      this.infraestructuraAplicacionService.findByidApp(this.currentAplicacion.id)
          .subscribe({
              next: (data) => {
                  this.respuestaInfraestructuraAllAplicacion = data;
                  this.dataSource = new MatTableDataSource<InfraestructuraAllAplicacion>(this.respuestaInfraestructuraAllAplicacion.body);
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
  }
  

  saveInfraestructuraAplicacion(): void {
    if(this.newInfraestructuraAplicacion.id==null || this.newInfraestructuraAplicacion.id=='')
    {
        this.infraestructuraAplicacionService.create(this.newInfraestructuraAplicacion)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.ngCargarTabla();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.infraestructuraAplicacionService.update(this.newInfraestructuraAplicacion.id,this.newInfraestructuraAplicacion)
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


    getDetalleCatalogo(id: string): void {
      this.detalleCatalogoService.findByidCat(6)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoAmbiente = data;        
            this.detalleCatalogoAmbiente = this.respuestaCatalogoAmbiente.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
    }

    getServidor(): void {
        this.servidorService.getAll()
          .subscribe({
            next: (data) => {
              this.respuestaServidor= data;
              this.detalleCatalogoSer = this.respuestaServidor.body as Servidor[];
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
        }
    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }
  
    openDialog(selec: InfraestructuraAllAplicacion): void {
    var expandedElement=<InfraestructuraAllAplicacion>{
      id: selec.id||'', 
      ambienteInf: selec.ambienteInf||'', 
      idSer:selec.idSer||'', 
      idApl:selec.idApl||'', 
      rutaInf:selec.rutaInf||'', 
      detalleInf:selec.detalleInf||'', 
      detalleSer:selec.detalleSer||'', 
      ipSer:selec.ipSer||'', 
      nombreApl:selec.nombreApl||'', 
      nombreDet:selec.nombreDet||'', 
      nombreSer:selec.nombreSer||'', 
      ssoSer:selec.ssoSer||''
      };
    
      this.dialog.open(InfraestructuraAplicacionDialog, {
        width: '95%',
        height: '95%',
        data: expandedElement
      
      });
    }
  }
  
  @Component({
    selector: 'infraestructura-aplicacion.component-dialog',
    templateUrl: 'infraestructura-aplicacion.component-dialog.html',
    styleUrls: ['infraestructura-aplicacion.component-dialog.css']
  })
  export class InfraestructuraAplicacionDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<InfraestructuraAplicacionDialog>,
      @Inject(MAT_DIALOG_DATA) public data: InfraestructuraAllAplicacion) {}
    
    ngOnInit(): void { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }