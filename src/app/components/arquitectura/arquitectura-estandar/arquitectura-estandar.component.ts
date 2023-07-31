import { Component, OnInit } from '@angular/core';
import { ArquitecturaEstandar } from 'src/app/models/arquitectura/arquitectura-estandar.model';
import { ArquitecturaEstandarService } from 'src/app/services/arquitectura/arquitectura-estandar.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';


@Component({
  selector: 'app-arquitectura-estandar',
  templateUrl: './arquitectura-estandar.component.html',
  styleUrls: ['./arquitectura-estandar.component.css']
})
export class ArquitecturaEstandarComponent implements OnInit {
  selection = new SelectionModel<ArquitecturaEstandar>(false, []);
  displayedColumns: string[] = ['id', 'tecnologiaEst', 'lenguajeEst','componenteEst', 'descripcionEst','getDetalle', 'getRecursos','getEdit'];
  dataSource = new MatTableDataSource < ArquitecturaEstandar > ();
  respuestaArquitecturaEstandar : ERespuesta = new ERespuesta;  
  submitted = true;
  tableActive = true;
  logicaActive = false;
  recursosActive = false;
  catalogo?: ArquitecturaEstandar[];
  currentArquitecturaEstandar: ArquitecturaEstandar={};
  title = '';
  newArquitecturaEstandar = {id: "", lenguajeEst:'', tecnologiaEst:'', componenteEst:'', descripcionEst:''};
  catalogoTecnologia: DetalleCatalogo={};
  detalleCatalogoLenguaje: DetalleCatalogo[] = [];
  detalleCatalogoTecnologia: DetalleCatalogo[] = [];
  respuestaCatalogoLenguaje : ERespuesta = new ERespuesta;
  respuestaCatalogoTecnologia : ERespuesta = new ERespuesta;
  detalleCatalogoComponente: DetalleCatalogo[] = [];
  respuestaCatalogoComponente : ERespuesta = new ERespuesta;

  constructor(private catalogoService: ArquitecturaEstandarService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

 
  ngOnInit(): void {
    this.getArquitecturaEstandar();
    this.getDetalleCatalogo();
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
    this.newArquitecturaEstandar = {
        id: '',
        lenguajeEst: '',
        tecnologiaEst: '',
        componenteEst:'', 
        descripcionEst:''
    };
  }, 100);
}

setActiveHome(): void {
  this.submitted = true;
  this.tableActive = true;
  this.logicaActive = false;
  this.recursosActive = false;
}
setTitulo(item: ArquitecturaEstandar): void{
  this.catalogoTecnologia = <DetalleCatalogo>this.detalleCatalogoTecnologia.find(el => el.id == item.tecnologiaEst);
  this.title=this.catalogoTecnologia.nombreDet||'';
}

editArquitecturaEstandar(item: ArquitecturaEstandar): void {
this.enablePanel();
setTimeout(() => {
this.newArquitecturaEstandar = {
    id: item.id || '',
    lenguajeEst: item.lenguajeEst || '',
    tecnologiaEst: item.tecnologiaEst || '',
    componenteEst: item.componenteEst || '', 
    descripcionEst: item.descripcionEst || ''
};
}, 100);

}

  getArquitecturaEstandar(): void {
    this.catalogoService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaArquitecturaEstandar = data;
            this.dataSource = new MatTableDataSource < ArquitecturaEstandar > (this.respuestaArquitecturaEstandar.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }

  refreshList(): void {
    this.getArquitecturaEstandar();
    this.currentArquitecturaEstandar = {};
  }

  setActiveAplicacion(item: ArquitecturaEstandar): void {
    this.setTitulo(item);
    this.currentArquitecturaEstandar = item;     
  this.submitted = true;
  this.tableActive = false;
  this.logicaActive = true;
  this.recursosActive = false;
  }
  setActiveRecursos(item: ArquitecturaEstandar): void {
    this.setTitulo(item);
    this.currentArquitecturaEstandar = item;   
    this.submitted = true;
    this.tableActive = false;
    this.logicaActive = false;
    this.recursosActive = true;
  }

  searchTitle(): void {
    this.dataSource=new MatTableDataSource<ArquitecturaEstandar>();
    if(this.title==null || this.title==''){
      this.refreshList();
    }
else
{
    /*this.catalogoService.findByNameCat(this.title)
    .subscribe({
      next: (data) => {
        this.respuestaArquitecturaEstandar = data;
          this.dataSource = new MatTableDataSource < ArquitecturaEstandar > (this.respuestaArquitecturaEstandar.body);
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });*/
  }
  }

  saveArquitecturaEstandar(): void {   
    if(this.newArquitecturaEstandar.id==null || this.newArquitecturaEstandar.id=='')
    {
        this.catalogoService.create(this.newArquitecturaEstandar)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getArquitecturaEstandar();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.catalogoService.update(this.newArquitecturaEstandar.id,this.newArquitecturaEstandar)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.getArquitecturaEstandar();
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

    getDetalleCatalogo(): void {
        this.detalleCatalogoService.findByidCat(12)
          .subscribe({
            next: (data) => { 
              this.respuestaCatalogoTecnologia = data;        
              this.detalleCatalogoTecnologia = this.respuestaCatalogoTecnologia.body as DetalleCatalogo[];
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
          this.detalleCatalogoService.findByidCat(13)
            .subscribe({
              next: (data) => {
                this.respuestaCatalogoLenguaje = data;        
                this.detalleCatalogoLenguaje = this.respuestaCatalogoLenguaje.body as DetalleCatalogo[];
              },
              error: (er) => {this.createSnackBar(er.error.error.mensaje);}
            });            
      this.detalleCatalogoService.findByidCat(19)
      .subscribe({
        next: (data) => { 
          this.respuestaCatalogoComponente = data;        
          this.detalleCatalogoComponente = this.respuestaCatalogoComponente.body as DetalleCatalogo[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    
    }
}
