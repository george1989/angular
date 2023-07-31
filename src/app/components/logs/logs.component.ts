import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs } from 'src/app/models/logs.model';
import { LogsService } from 'src/app/services/logs.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { Servidor } from 'src/app/models/servidor.model';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['ico','id','nombreLog','descripcionLog','tipoLog','fueGenLog','sincronizacionLog','formatoLog','retencionLog','backupLog','freBacLog','monitoreoLog','idSer','idApl', 'getEdit'];
  //dataSource : any;
  dataSource = new MatTableDataSource<Logs>();
  newLogs = {id: "", nombreLog: "", descripcionLog: "", tipoLog: "", fueGenLog: "", sincronizacionLog: "", formatoLog: "", retencionLog: "", backupLog: "", freBacLog: "", monitoreoLog: "", idSer: "", idApl: ""};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<Logs>();
  selection = new SelectionModel<Logs>(false, []);
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  detalleCatalogoSer: Servidor[] = [];
  detalleCatalogoSincro: DetalleCatalogo[] = [];
  respuestaServidor: ERespuesta = new ERespuesta;
  respuestaLogs: ERespuesta = new ERespuesta;
  respuestaCatalogoSincro: ERespuesta = new ERespuesta;
  respuestaCatalogoTipo: ERespuesta = new ERespuesta;
  @Input() viewMode = false;
  @Input() currentAplicacion: Aplicacion = {
    nombreApl: '',
    descripcionApl: '',
    estadoApl: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private logsService: LogsService,
    public dialog: MatDialog,
    private detalleCatalogoService: DetalleCatalogoService,
    private servidorService:ServidorService
    ) { }

  ngOnInit(): void {   
    console.log('Carga Logs'); 
    this.getServidor();
    this.getDetalleCatalogo();
    this.ngCargarTabla();

  }

  ngOnChanges(): void {
      this.ngCargarTabla();
  }
 
  enablePanel(): void {
    this.submitted = false;
    this.tableActive = false;
    setTimeout(() => {
        this.newLogs = {
            id: '',
            idApl: this.currentAplicacion.id,
            nombreLog: '',
            descripcionLog: '',
            tipoLog: '',
            fueGenLog: '',
            sincronizacionLog: '',
            formatoLog: '',
            retencionLog: '',
            backupLog: '',
            freBacLog: '',
            monitoreoLog: '',
            idSer: ''
          };
    }, 100);
  }
  disablePanel(): void{
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
        this.newLogs = {
            id: '',
            idApl: this.currentAplicacion.id,
            nombreLog: '',
            descripcionLog: '',
            tipoLog: '',
            fueGenLog: '',
            sincronizacionLog: '',
            formatoLog: '',
            retencionLog: '',
            backupLog: '',
            freBacLog: '',
            monitoreoLog: '',
            idSer: ''
          };
}

  editLogs(item: Logs): void{
    this.enablePanel();
    setTimeout(() => {
      this.newLogs = {
        id: item.id||'',
        nombreLog: item.nombreLog||'',
        descripcionLog: item.descripcionLog||'',
        tipoLog: item.tipoLog||'',
        fueGenLog: item.fueGenLog||'',
        sincronizacionLog: item.sincronizacionLog||'',
        formatoLog: item.formatoLog||'',
        retencionLog: item.retencionLog||'',
        backupLog: item.backupLog||'',
        freBacLog: item.freBacLog||'',
        monitoreoLog: item.monitoreoLog||'',
        idSer: item.idSer||'',
        idApl: item.idApl||''};
    }, 100);
  }

    ngCargarTabla(): void {
      if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
        return;
      }
      this.logsService.findByidApp(this.currentAplicacion.id)
        .subscribe({
          next: (data) => {
            this.respuestaLogs = data;            
            this.dataSource = new MatTableDataSource<Logs>(this.respuestaLogs.body);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
      }


  saveLogs(): void {   
    if(this.newLogs.id==null || this.newLogs.id=='')
    {
        this.logsService.create(this.newLogs)
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
      this.logsService.update(this.newLogs.id,this.newLogs)
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
      this.detalleCatalogoService.findByidCat(3)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoTipo= data;
            this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as Servidor[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
        this.detalleCatalogoService.findByidCat(4)
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoSincro= data;
              this.detalleCatalogoSincro = this.respuestaCatalogoSincro.body as Servidor[];
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
          this._snackBar.open('Logs: '+mensaje,'OK',{
            duration: 2000
          });
        }

        openDialog(selec: Logs): void {
          
          var tipoLog =<DetalleCatalogo>this.detalleCatalogoTipo.find(el => el.id == selec.tipoLog);
          var idSer = <Servidor>this.detalleCatalogoSer.find(el => el.id == selec.idSer);
          var sincronizacionLog = <DetalleCatalogo>this.detalleCatalogoSincro.find(el => el.id == selec.sincronizacionLog);
          var expandedElement=<Logs>{
            id: selec.id||'',
            nombreLog: selec.nombreLog||'',
            descripcionLog: selec.descripcionLog||'',
            tipoLog: tipoLog.nombreDet||'',
            fueGenLog: selec.fueGenLog||'',
            sincronizacionLog: sincronizacionLog.nombreDet||'',
            formatoLog: selec.formatoLog||'',
            retencionLog: selec.retencionLog||'',
            backupLog: selec.backupLog||'',
            freBacLog: selec.freBacLog||'',
            monitoreoLog: selec.monitoreoLog||'',
            idSer: idSer.nombreSer||'',
            idApl: selec.idApl||''
          };
        
          this.dialog.open(LogsDialog, {
            width: '95%',
            height: '95%',
            data: expandedElement
          
          });
        }
      }
      
      @Component({
        selector: 'logs.component-dialog',
        templateUrl: 'logs.component-dialog.html',
        styleUrls: ['logs.component-dialog.css']
      })
      export class LogsDialog implements OnInit {
        constructor(
          public dialogRef: MatDialogRef<LogsDialog>,
          @Inject(MAT_DIALOG_DATA) public data: Logs) {}
        
        ngOnInit(): void { 
        }
        onNoClick(): void {
          this.dialogRef.close();
        }
      }