import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursosComponente } from 'src/app/models/arquitectura/recursos-componente.model';
import { RecursosComponenteService } from 'src/app/services/arquitectura/recursos-componente.service';
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

@Component({
  selector: 'app-recursos-componente',
  templateUrl: './recursos-componente.component.html',
  styleUrls: ['./recursos-componente.component.css']
})
export class RecursosComponenteComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentAplicacion: Aplicacion = {
    nombreApl: '',
    descripcionApl: '',
    estadoApl: '',
  };
  displayedColumns: string[] = ['ico','id','nombreAre','descripcionAre','rutaAre','tipoAre','datosAre','notasAre', "getDetail", "getEdit"];
  dataSource = new MatTableDataSource<RecursosComponente>();
  newRecurso = {id: "", nombreAre: "", descripcionAre: "", rutaAre: "", tipoAre: "", datosAre: "", notasAre: ""};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<RecursosComponente>();
  selection = new SelectionModel<RecursosComponente>(false, []);
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaRecurso : ERespuesta = new ERespuesta;
  respuestaCatalogoTipo : ERespuesta = new ERespuesta;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private aplicacionService: AplicacionService,
    private recursosService: RecursosComponenteService,
    private detalleCatalogoService: DetalleCatalogoService,
    private servidorService:ServidorService
    ) { }

  ngOnInit(): void {    
    this.getDetalleCatalogo();
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
    this.newRecurso = {
      id: "", 
      nombreAre: "", 
      descripcionAre: "", 
      rutaAre: "", 
      tipoAre: "", 
      datosAre: "", 
      notasAre: ""
    };
  }, 100);
}

  editRecurso(selec: RecursosComponente): void{
      this.enablePanel();
      setTimeout(() => {
        this.newRecurso = {
          id: selec.id||'',
          nombreAre: selec.nombreAre||'',
          descripcionAre: selec.descripcionAre||'',
          rutaAre: selec.rutaAre||'',
          tipoAre: selec.tipoAre||'',
          datosAre: selec.datosAre||'',
          notasAre: selec.notasAre||''        
        };
      }, 100);
  }

  ngCargarTabla(): void {
      this.recursosService.getAll()
        .subscribe({
          next: (data) => {
            this.respuestaRecurso = data;
            this.dataSource = new MatTableDataSource<RecursosComponente>(this.respuestaRecurso.body);
          },
          error: (er) => {
            this._snackBar.open(er.error.error.mensaje,'OK',{
              duration: 2000
            });
          }
        });
      }

  saveRecurso(): void {   
    if(this.newRecurso.id==null || this.newRecurso.id=='')
    {
        this.recursosService.create(this.newRecurso)
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
      this.recursosService.update(this.newRecurso.id,this.newRecurso)
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
    openRecurso(selec: RecursosComponente){
      if(selec.tipoAre=='114')
      {
        window.open(selec.rutaAre, "_blank");
      }
      else{
        this.createSnackBar('Tipo de recurso no valido para esta acción');
      }
  }

  openDialog(selec: RecursosComponente): void {
    var tipoAre =<DetalleCatalogo>this.detalleCatalogoTipo.find(el => el.id == selec.tipoAre);
    var expandedElement=<RecursosComponente>{
      id: selec.id||'',
      nombreAre: selec.nombreAre||'',
      descripcionAre: selec.descripcionAre||'',
      rutaAre: selec.rutaAre||'',
      tipoAre: tipoAre.nombreDet||'',
      datosAre: selec.datosAre||'',
      notasAre: selec.notasAre||''  
    };
  
    this.dialog.open(RecursosComponenteDialog, {
      width: '95%',
      height: '95%',
      data: expandedElement
    
    });
  }
}

@Component({
  selector: 'recursos-componente.component-dialog',
  templateUrl: 'recursos-componente.component-dialog.html',
  styleUrls: ['recursos-componente.component-dialog.css']
})
export class RecursosComponenteDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecursosComponenteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RecursosComponente) {}
  
  ngOnInit(): void { 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
