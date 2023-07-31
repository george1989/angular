import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Documentacion } from 'src/app/models/documentacion/documentacion.model';
import { DocumentacionService } from 'src/app/services/documentacion/documentacion.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocumentacionComponent  implements OnInit {
    extencionDoc?: any;
    displayedColumns: string[] = ['ico','id', 'codigoDoc', 'nombreDoc', 'descripcionDoc','plantillaDoc','extencionDoc', 'getEdit'];
  //dataSource : any;
  dataSource = new MatTableDataSource<Documentacion>();
  newDocumentacion = {id: "", codigoDoc: "", nombreDoc:'', plantillaDoc:'', descripcionDoc:'', extencionDoc:''};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<Documentacion>();
  selection = new SelectionModel<Documentacion>(false, []);  
  detalleCatalogoExtension: DetalleCatalogo[] = [];
  respuestaCatalogoExtension : ERespuesta = new ERespuesta;
  respuestaDocumentacion : ERespuesta = new ERespuesta;
  expandedElement= new Documentacion;


  constructor(private servidorService: DocumentacionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {  
    this.getDetalleCatalogo('');  
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
    this.newDocumentacion = {
      id: '', codigoDoc:'', nombreDoc:'', descripcionDoc:'',plantillaDoc:'',extencionDoc:''
    };
  }, 100);
}



  editDocumentacion(item: Documentacion): void{
    this.enablePanel();
    setTimeout(() => {
      this.newDocumentacion = {
         id: item.id||'', 
         codigoDoc: item.codigoDoc||'', 
         nombreDoc:item.nombreDoc||'', 
         descripcionDoc:item.descripcionDoc||'',
         plantillaDoc:item.plantillaDoc||'',
         extencionDoc:item.extencionDoc||''
        };
    }, 100);
  }

  ngCargarTabla(): void {
    this.servidorService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaDocumentacion = data;
          this.dataSource = new MatTableDataSource<Documentacion>(this.respuestaDocumentacion.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }

  saveDocumentacion(): void {   
    console.log(this.newDocumentacion.id); 
    if(this.newDocumentacion.id==null || this.newDocumentacion.id=='')
    {
        this.servidorService.create(this.newDocumentacion)
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
      this.servidorService.update(this.newDocumentacion.id,this.newDocumentacion)
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
      console.log(id);
      this.detalleCatalogoService.findByidCat(18)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoExtension = data;        
            this.detalleCatalogoExtension = this.respuestaCatalogoExtension.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
    }
    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }

    openDialog(selec: Documentacion): void {
      var extencionDoc = <DetalleCatalogo>this.detalleCatalogoExtension.find(el => el.id == selec.extencionDoc);
      var expandedElement=<Documentacion>{
        id: selec.id||'', 
        codigoDoc: selec.codigoDoc||'', 
        nombreDoc:selec.nombreDoc||'', 
        descripcionDoc:selec.descripcionDoc||'',
        plantillaDoc:selec.plantillaDoc||'',
        extencionDoc:extencionDoc.nombreDet||''
      };
    
      this.dialog.open(DocumentacionDialog, {
        width: '95%',
        height: '95%',
        data: expandedElement
      
      });
    }
  }
  
  @Component({
    selector: 'documentacion.component-dialog',
    templateUrl: 'documentacion.component-dialog.html',
    styleUrls: ['documentacion.component-dialog.css']
  })
  export class DocumentacionDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<DocumentacionDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Documentacion) {}
    
    ngOnInit(): void { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }