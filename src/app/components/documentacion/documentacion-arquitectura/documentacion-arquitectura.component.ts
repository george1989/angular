import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { DocumentacionArquitectura } from 'src/app/models/documentacion/documentacion-arquitectura.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DocumentacionArquitecturaService } from 'src/app/services/documentacion/documentacion-arquitectura.service';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Documentacion } from 'src/app/models/documentacion/documentacion.model';
import { DocumentacionService } from 'src/app/services/documentacion/documentacion.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class Dynamic {
  metodologiaMat?: any;
  areaMat?: any;
  etapaMat?: any;
  idDoc?: any;
}


@Component({
  selector: 'app-documentacion-arquitectura',
  templateUrl: './documentacion-arquitectura.component.html',
  styleUrls: ['./documentacion-arquitectura.component.css'],
})
export class DocumentacionArquitecturaComponent  implements OnInit {

  displayedColumns: string[] = ['ico','id','areaMat','etapaMat','metodologiaMat','idDoc','publicacionMat','firmaMat','firmanteMat','versionesMat','obligatorioMat','observacionMat','notaMat', 'getEdit'];
  dataSource = new MatTableDataSource<DocumentacionArquitectura>();
  currentDocumentacionArquitectura = {id:'', areaMat:'', etapaMat:'',metodologiaMat:'', idDoc:'', publicacionMat:'', firmaMat:'', firmanteMat:'', versionesMat:'', obligatorioMat:'', observacionMat:'', notaMat:''};
  filtro : Dynamic = new Dynamic();
  submitted = true;
  tableActive = true;
  title = '';
  tabActive=true;
  detalleCatalogoArea: DetalleCatalogo[] = [];
  detalleCatalogoEtapa: DetalleCatalogo[] = [];
  detalleCatalogoDocumento: Documentacion[] = [];
  detalleCatalogoSelSimple: DetalleCatalogo[] = [];
  detalleCatalogoMetodo: DetalleCatalogo[] = [];
  respuestaCatalogoMetodo : ERespuesta = new ERespuesta
  respuestaCatalogoSelSimple : ERespuesta = new ERespuesta;
  respuestaCatalogoDocumento : ERespuesta = new ERespuesta;
  respuestaCatalogoEtapa : ERespuesta = new ERespuesta;
  respuestaCatalogoArea : ERespuesta = new ERespuesta;
  respuestaArquitectura : ERespuesta = new ERespuesta;
  filter : Dynamic = new Dynamic();

  constructor(private servidorService: DocumentacionArquitecturaService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private documentacionService: DocumentacionService,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {    
    this.getDocumentacionArquitectura();
    this.getDetalleCatalogo('1');
  }

  ngOnChanges(): void{
    this.getDocumentacionArquitectura();

  }
  enablePanel(): void {
    this.topPage();
    this.submitted = false;
    this.tableActive = false;    
    if(this.currentDocumentacionArquitectura.id==null || this.currentDocumentacionArquitectura.id==''){
      this.tabActive=false;
    }
    else
    {
      this.tabActive=true;
    }
  }
  disablePanel(): void{
    this.topPage();
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.currentDocumentacionArquitectura = {
      id:'', areaMat:'', etapaMat:'', idDoc:'', publicacionMat:'', metodologiaMat:'',firmaMat:'', firmanteMat:'', versionesMat:'', obligatorioMat:'', observacionMat:'', notaMat:''};
  }
  topPage(): void{
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  editDocumentacionArquitectura(item: DocumentacionArquitectura): void{
      this.enablePanel();
      setTimeout(() => {
        this.currentDocumentacionArquitectura = {
          id: item.id||'',
          areaMat: item.areaMat||'',
          etapaMat: item.etapaMat||'',
          metodologiaMat: item.metodologiaMat||'',
          idDoc: item.idDoc||'',
          publicacionMat: item.publicacionMat||'',
          firmaMat: item.firmaMat||'',
          firmanteMat: item.firmanteMat||'',
          versionesMat: item.versionesMat||'',
          obligatorioMat: item.obligatorioMat||'',
          observacionMat: item.observacionMat||'',
          notaMat: item.notaMat||''
        };
      }, 100);
      if(this.currentDocumentacionArquitectura.id==null || this.currentDocumentacionArquitectura.id==''){
        this.tabActive=true;
      }
      else
      {
        this.tabActive=false;
      }
      console.log('this.tabActive'+this.tabActive);

  }
  
  getDocumentacionArquitectura(): void {
    this.dataSource= new MatTableDataSource<DocumentacionArquitectura>();
    this.servidorService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaArquitectura = data;
          this.dataSource = new MatTableDataSource<DocumentacionArquitectura>(this.respuestaArquitectura.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }
      
  getDocumentacionArquitecturaFilter(): void {
    this.dataSource= new MatTableDataSource<DocumentacionArquitectura>();
    this.filter.metodologiaMat = this.filtro.metodologiaMat||0;
    this.filter.areaMat = this.filtro.areaMat||0;
    this.filter.etapaMat = this.filtro.etapaMat||0;
    this.filter.idDoc = this.filtro.idDoc||0;
    this.servidorService.filter(this.filter)
      .subscribe({
        next: (data) => {
          this.respuestaArquitectura = data;
          this.dataSource = new MatTableDataSource<DocumentacionArquitectura>(this.respuestaArquitectura.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }

  saveDocumentacionArquitectura(): void {   
    console.log(this.currentDocumentacionArquitectura.id); 
    if(this.currentDocumentacionArquitectura.id==null || this.currentDocumentacionArquitectura.id=='')
    {
        this.servidorService.create(this.currentDocumentacionArquitectura)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getDocumentacionArquitectura();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.servidorService.update(this.currentDocumentacionArquitectura.id,this.currentDocumentacionArquitectura)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel()
            this.getDocumentacionArquitectura();
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });

     }

    }



    getDetalleCatalogo(id: string): void { 
        this.detalleCatalogoService.findByidCat(16)
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoEtapa = data;        
              this.detalleCatalogoEtapa = this.respuestaCatalogoEtapa.body as DetalleCatalogo[];
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
        this.detalleCatalogoService.findByidCat(17)
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoSelSimple = data;        
              this.detalleCatalogoSelSimple = this.respuestaCatalogoSelSimple.body as DetalleCatalogo[];
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
      this.detalleCatalogoService.findByidCat(15)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoArea= data;        
            this.detalleCatalogoArea = this.respuestaCatalogoArea.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
        this.documentacionService.getAll()
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoDocumento= data;        
              this.detalleCatalogoDocumento = this.respuestaCatalogoDocumento.body as DetalleCatalogo[];
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
          this.detalleCatalogoService.findByidCat(20)
            .subscribe({
              next: (data) => {
                this.respuestaCatalogoMetodo = data;        
                this.detalleCatalogoMetodo = this.respuestaCatalogoMetodo.body as DetalleCatalogo[];
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
            });
    }
    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }

    openDialog(selec: DocumentacionArquitectura): void {
      var areaMat =<DetalleCatalogo>this.detalleCatalogoArea.find(el => el.id == selec.areaMat);
      var etapaMat = <DetalleCatalogo>this.detalleCatalogoEtapa.find(el => el.id == selec.etapaMat);
      var idDoc = <Documentacion>this.detalleCatalogoDocumento.find(el => el.id == selec.idDoc);
      var firmaMat = <DetalleCatalogo>this.detalleCatalogoSelSimple.find(el => el.id == selec.firmaMat);
      var metodologiaMat = <DetalleCatalogo>this.detalleCatalogoMetodo.find(el => el.id == selec.metodologiaMat);
      var obligatorioMat = <DetalleCatalogo>this.detalleCatalogoSelSimple.find(el => el.id == selec.obligatorioMat);
      var expandedElement=<DocumentacionArquitectura>{
        id: selec.id||'',
        areaMat: areaMat.nombreDet||'',
        etapaMat: etapaMat.nombreDet||'',
        metodologiaMat: metodologiaMat.nombreDet||'',
        idDoc: idDoc.nombreDoc||'',
        publicacionMat: selec.publicacionMat||'',
        firmaMat: firmaMat.nombreDet||'',
        firmanteMat: selec.firmanteMat||'',
        versionesMat: selec.versionesMat||'',
        obligatorioMat: metodologiaMat.nombreDet||'',
        observacionMat: selec.observacionMat||'',
        notaMat: selec.notaMat||''
      };
    
      this.dialog.open(DocumentacionArquitecturaDialog, {
        width: '95%',
        height: '95%',
        data: expandedElement
      
      });
    }
  }
  
  @Component({
    selector: 'documentacion-arquitectura.component-dialog',
    templateUrl: 'documentacion-arquitectura.component-dialog.html',
    styleUrls: ['documentacion-arquitectura.component-dialog.css']
  })
  export class DocumentacionArquitecturaDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<DocumentacionArquitecturaDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DocumentacionArquitectura) {}
    
    ngOnInit(): void { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }