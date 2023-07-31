import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoAplicacion } from 'src/app/models/aplicacion/recurso-aplicacion.model';
import { RecursoAplicacionService } from 'src/app/services/aplicacion/recurso-aplicacion.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { Servidor } from 'src/app/models/servidor.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse,HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-recurso-aplicacion',
  templateUrl: './recurso-aplicacion.component.html',
  styleUrls: ['./recurso-aplicacion.component.css']
})

export class RecursoAplicacionComponent implements OnInit {
  
  @Input() viewMode = false;
  @Input() currentAplicacion: Aplicacion = {
    nombreApl: '',
    descripcionApl: '',
    estadoApl: '',
  };
  displayedColumns: string[] = ['ico','id','nombreRec','tipoRec','descripcionRec','rutaRec','idApl', "getEdit"];
  dataSource = new MatTableDataSource<RecursoAplicacion>();
  newRecursoAplicacion = {id: "", nombreRec: "", tipoRec: "", descripcionRec: "", rutaRec: "", idApl: ""};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<RecursoAplicacion>();
  selection = new SelectionModel<RecursoAplicacion>(false, []);
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaRecursoAplicacion : ERespuesta = new ERespuesta;
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;
  selectFile : File = new File(["null"], "null.txt", {type: "text/plain",  });
  dataForm : string = "";
  frontImageSrc: SafeResourceUrl = "";


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private aplicacionService: AplicacionService,
    private recursoService: RecursoAplicacionService,
    private detalleCatalogoService: DetalleCatalogoService,
    private servidorService:ServidorService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {    
    console.log('Carga Infraestructura');
    this.getDetalleCatalogo();
    this.ngCargarTabla();

  }


  ngOnChanges(): void{
    this.ngCargarTabla();
  }
  enablePanel(): void {
    this.submitted = false;
    this.tableActive = false;
    setTimeout(() => {
        this.newRecursoAplicacion = {
          id: '',
          nombreRec: '',
          tipoRec: '',
          descripcionRec: '',
          rutaRec: '',
          idApl: this.currentAplicacion.id
        };
    }, 100);
  }
  disablePanel(): void{
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.newRecursoAplicacion = {
      id: '',
      nombreRec: '',
      tipoRec: '',
      descripcionRec: '',
      rutaRec: '',
      idApl: ''};
}

  editRecursoAplicacion(selec: RecursoAplicacion): void{
      this.enablePanel();
      setTimeout(() => {
        this.newRecursoAplicacion = {
          id: selec.id||'',
          nombreRec: selec.nombreRec||'',
          tipoRec: selec.tipoRec||'',
          descripcionRec: selec.descripcionRec||'',
          rutaRec: selec.rutaRec||'',
          idApl: selec.idApl||''};
      }, 100);
  }


  

  ngCargarTabla(): void {
    if(this.currentAplicacion.id=='' || this.currentAplicacion.id==null){
      return;
    }
      this.recursoService.findByidApp(this.currentAplicacion.id)
        .subscribe({
          next: (data) => {
            this.respuestaRecursoAplicacion = data;
            this.dataSource = new MatTableDataSource<RecursoAplicacion>(this.respuestaRecursoAplicacion.body);
          },
          error: (er) => {
            this._snackBar.open(er.error.error.mensaje,'OK',{
              duration: 2000
            });
          }
        });
      }

  saveRecursoAplicacion(): void {   
    console.log(this.selectFile.name);
     
     if(this.selectFile.name!="null.txt")
     {
      var ruta = "doc/"+this.currentAplicacion.id+"/";
      if(this.selectFile.type.includes('image'))
      {
        ruta = "picture/"+this.currentAplicacion.id+"/";
      }
      else{
        
        if(this.selectFile.type.includes('pdf'))
        {
          ruta = "pdf/"+this.currentAplicacion.id+"/";
        }
        else{
          ruta = "doc/"+this.currentAplicacion.id+"/";
        }
      }
      this.newRecursoAplicacion.rutaRec = ruta+this.selectFile.name;
      this.onUpload(ruta);
    }

    if(this.newRecursoAplicacion.id==null || this.newRecursoAplicacion.id=='')
    {
        this.recursoService.create(this.newRecursoAplicacion)
          .subscribe({
            next: (res) => {
              this._snackBar.open('Guardado Exitoso.','OK',{
                duration: 2000
              });
              this.disablePanel();
              this.ngCargarTabla();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.recursoService.update(this.newRecursoAplicacion.id,this.newRecursoAplicacion)
        .subscribe({
          next: (res) => {
            this._snackBar.open('Guardado Exitoso.','OK',{
              duration: 2000
            });
            this.disablePanel();
            this.ngCargarTabla();
          },
          error: (er) => {
            this._snackBar.open(er.error.error.mensaje,'OK',{
              duration: 2000
            });
          }
        });

     }
     
    }

    getDetalleCatalogo(): void {
      this.detalleCatalogoService.findByidCat(10)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoTipo = data;        
            this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
          },
          error: (er) => {
            this._snackBar.open(er.error.error.mensaje,'OK',{
              duration: 2000
            });
          }
        });
    }
    createSnackBar(mensaje: string): void {
      this._snackBar.open('Recursos: '+ mensaje,'OK',{
        duration: 2000
      });
    }

  

  openDialogDetalle(selec: RecursoAplicacion): void {
    var tipoRec =<DetalleCatalogo>this.detalleCatalogoTipo.find(el => el.id == selec.tipoRec);
var expandedElement=<RecursoAplicacion>{
      id: selec.id||'',
      nombreRec: selec.nombreRec||'',
      descripcionRec: selec.descripcionRec||'',
      tipoRec: tipoRec.nombreDet||'',
      rutaRec: selec.rutaRec||'',
      idApl: selec.idApl||''
    };
  
    this.dialog.open(RecursoDialog, {
      width: '95%',
      height: '95%',
      data: expandedElement
    
    });
  }

  
  onFileSelected(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files[0].size > 1048576){
      this._snackBar.open('Recursos:  Excede el tamaño máximo permitido','OK',{
        duration: 2000
      });
      event=null;
    }
    else{      
    this.selectFile = event.target.files[0];
    }
  }
  onUpload(ruta: string) {
    console.log(this.selectFile);
    console.log(this.selectFile.name);
    console.log(this.selectFile.size);
    console.log(this.selectFile.type);    
     var formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", this.selectFile, this.selectFile.name);
      formData.append("ruta", ruta);
      
      this.recursoService.upload(formData)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (er) => {
            this._snackBar.open(er.error.error.mensaje,'OK',{
              duration: 2000
            });
          }
        });
  }


  onDownload() {
    // TODO: implement file upload
    //console.log(this.selectFile);
    var formData = new FormData(); 
       
     // Store form name as "file" with file data
     formData.append("nombre", "tarjetas.png");
     formData.append("ruta", "picture/");
     
     this.recursoService.file(formData).subscribe(event => {
      //console.log(event.type);
      //console.log(event); 
      if (event.type === HttpEventType.DownloadProgress) {
        const percentDone = Math.round(100 * event.loaded / (event.total || 0))
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        console.log(event);
        var type = event.type;
        console.log(event.body);
        console.log(event.type);
        var blob = new Blob([event.body as any], { type: 'image/png' });
        let objectURL = URL.createObjectURL(blob);
        //window.location.href = URL.createObjectURL(blob);
        window.open(window.URL.createObjectURL(blob), "_blank");
        //this.dataForm = this.sanitizer.bypassSecurityTrustHtml(objectURL);
        //this.dataForm = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(objectURL);
        this.dataForm = objectURL;
        console.log(this.dataForm);
        //this.dataForm = this.sanitizer.bypassSecurityTrustUrl(objectURL);
       // console.log(this.dataForm);

      this.frontImageSrc = this.transform(objectURL);
      
      }
    });
  }

  public transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  

}


      
@Component({
  selector: 'recurso-aplicacion-detalle.component-dialog',
  templateUrl: 'recurso-aplicacion-detalle.component-dialog.html',
  styleUrls: ['./recurso-aplicacion-detalle.component-dialog.css']
})
export class RecursoDialog implements OnInit {  
  imagePath:string='';
  frontImageSrc: SafeResourceUrl = "";
  constructor(
    public dialogRef: MatDialogRef<RecursoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RecursoAplicacion,
    private recursoService: RecursoAplicacionService,
    private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void { 
    this.imagePath=this.data.rutaRec;
    this.onDownload(this.data.rutaRec);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onDownload(fileName: string) {
    
    var path = fileName.substr(0,fileName.lastIndexOf('/')+ 1 );
    console.log(path);
    var archivo = fileName.substr(fileName.lastIndexOf('/') + 1);
    console.log(archivo);
    var nombre = archivo.substr(0, archivo.lastIndexOf('.'));  
    console.log(nombre); 
    var extension = archivo.substr(archivo.lastIndexOf('.')+1);  
    console.log(extension); 

    var formData = new FormData(); 
     formData.append("nombre", archivo);
     formData.append("ruta", path);
     this.recursoService.file(formData).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        const percentDone = Math.round(100 * event.loaded / (event.total || 0))
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        console.log(event);
        var type = event.type;
        console.log(event.body);
        console.log(event.type);
        var blob = new Blob([event.body as any], { type: 'image/jpg' });
        //var blob = new Blob([event.body as any], { type: 'application/pdf' });
        let objectURL = URL.createObjectURL(blob);
        this.frontImageSrc = this.transform(objectURL); 
        window.open(objectURL, "_blank");     
      }
    });
  }
  public transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}