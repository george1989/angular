import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentacionAplicacion } from 'src/app/models/documentacion/documentacion-aplicacion.model';
import { DocumentacionAplicacionService } from 'src/app/services/documentacion/documentacion-aplicacion.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { DocumentacionArquitectura } from 'src/app/models/documentacion/documentacion-arquitectura.model';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-documentacion-aplicacion',
  templateUrl: './documentacion-aplicacion.component.html',
  styleUrls: ['./documentacion-aplicacion.component.css']
})
export class DocumentacionAplicacionComponent implements OnInit {
  displayedColumns: string[] = ['ico','id','idApl','idMat','generalDap','aplicaDap','noAplicaDap', 'getEdit'];
  //dataSource : any;
  dataSource = new MatTableDataSource<DocumentacionAplicacion>();
  newDocumentacionAplicacion = {id: "", idApl: "", idMat: "", generalDap: "", aplicaDap: "", noAplicaDap: ""};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<DocumentacionAplicacion>();
  selection = new SelectionModel<DocumentacionAplicacion>(false, []);
  detalleAplicaciones: Aplicacion[] = [];
  respuestaAplicacion: ERespuesta = new ERespuesta;
  respuestaDocumentacionAplicacion: ERespuesta = new ERespuesta;
  @Input() viewMode = false;
  @Input() currentMatriz: DocumentacionArquitectura = {
    id: '',
  };

  constructor(
    private documentacionAplicacionService: DocumentacionAplicacionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private aplicacionService: AplicacionService
    ) { }

  ngOnInit(): void {   
    this.getAplicacion();
    this.ngCargarTabla();

  }
  ngCargarTabla(){
    this.dataSource = new MatTableDataSource<DocumentacionAplicacion>();
      if(this.currentMatriz.id!= null && this.currentMatriz.id!= '')
        {
          this.getDocumentacionAplicacionAplicacion();
        }
        else{
          this.getDocumentacionAplicacion();
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
      this.newDocumentacionAplicacion = {
          id: "", 
          idApl: "", 
          idMat: this.currentMatriz.id, 
          generalDap: "", 
          aplicaDap: "", 
          noAplicaDap: ""
        };
  }, 100);
}

  editDocumentacionAplicacion(item: DocumentacionAplicacion): void{
    this.enablePanel();
    setTimeout(() => {
      this.newDocumentacionAplicacion = {
        id: item.id||'', 
        idApl: item.idApl||'', 
        idMat: item.idMat||'', 
        generalDap: item.generalDap||'', 
        aplicaDap: item.aplicaDap||'', 
        noAplicaDap: item.noAplicaDap||''
      };
    }, 100);
  }

  getDocumentacionAplicacion(): void {
    this.documentacionAplicacionService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaDocumentacionAplicacion = data;
          this.dataSource = new MatTableDataSource<DocumentacionAplicacion>(this.respuestaDocumentacionAplicacion.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }
    getDocumentacionAplicacionAplicacion(): void {
      this.documentacionAplicacionService.findByidMat(this.currentMatriz.id)
        .subscribe({
          next: (data) => {
            this.respuestaDocumentacionAplicacion = data;
            this.dataSource = new MatTableDataSource<DocumentacionAplicacion>(this.respuestaDocumentacionAplicacion.body);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
      }

  saveDocumentacionAplicacion(): void {   
    if(this.newDocumentacionAplicacion.id==null || this.newDocumentacionAplicacion.id=='')
    {
        this.documentacionAplicacionService.create(this.newDocumentacionAplicacion)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel()
              this.ngCargarTabla();
            },
            error: (er) => console.error(er)
          });
     }
     else{
      this.documentacionAplicacionService.update(this.newDocumentacionAplicacion.id,this.newDocumentacionAplicacion)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.ngCargarTabla();
          },
          error: (er) => console.error(er)
        });
     }
    }

    getAplicacion(): void {
      this.aplicacionService.getAll()
        .subscribe({
          next: (data) => {
            this.respuestaAplicacion = data;        
            this.detalleAplicaciones = this.respuestaAplicacion.body as Aplicacion[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
    }

    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }

    openDialog(selec: DocumentacionAplicacion): void {
      var idApl =<Aplicacion>this.detalleAplicaciones.find(el => el.id == selec.idApl);
      var expandedElement=<DocumentacionAplicacion>{
        id: selec.id||'', 
        idApl: idApl.nombreApl||'', 
        idMat: selec.idMat||'', 
        generalDap: selec.generalDap||'', 
        aplicaDap: selec.aplicaDap||'', 
        noAplicaDap: selec.noAplicaDap||''
      };
    
      this.dialog.open(DocumentacionAplicacionDialog, {
        width: '85%',
        height: '85%',
        data: expandedElement
      
      });
    }
  }
  
  @Component({
    selector: 'documentacion-aplicacion.component-dialog',
    templateUrl: 'documentacion-aplicacion.component-dialog.html',
    styleUrls: ['documentacion-aplicacion.component-dialog.css']
  })
  export class DocumentacionAplicacionDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<DocumentacionAplicacionDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DocumentacionAplicacion) {}
    
    ngOnInit(): void { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }