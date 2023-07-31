import { Component, OnInit } from '@angular/core';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import{EventEmitter} from '@angular/core';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-aplicacion',
  templateUrl: './add-aplicacion.component.html',
  styleUrls: ['./add-aplicacion.component.css']
})
export class 
AddAplicacionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombreApl', 'descripcionApl', 'tipoApl', 'versionApl', 'estadoApl', 'responsableApl','criticidadApl','desarrolloApl', 'getEdit'];
  dataSource = new MatTableDataSource<Aplicacion>();
  currentAplicacion = {id: '', nombreApl: '', descripcionApl:'', tipoApl:'', versionApl:'', estadoApl:'', responsableApl:'', criticidadApl:'', desarrolloApl:''};
  submitted = true;
  modeEdit = false;
  tableActive = true;
  title = '';
  tabActive=true;
  clickedRows = new Set<Aplicacion>();
  selection = new SelectionModel<Aplicacion>(false, []);
  detalleCatalogoEstado: DetalleCatalogo[] = [];
  respuestaCatalogoEstado : ERespuesta = new ERespuesta
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta
  detalleCatalogoCrit: DetalleCatalogo[] = [];
  respuestaCatalogoCrit : ERespuesta = new ERespuesta
  detalleCatalogoDesa: DetalleCatalogo[] = [];
  respuestaCatalogoDesa : ERespuesta = new ERespuesta
  respuestaAplicacion : ERespuesta = new ERespuesta
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 75;

  constructor(private aplicacionService: AplicacionService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void { 
    this.topPage();  
    this.getAplicacion();
    this.getDetalleCatalogo('1');
  }

  ngOnChanges(): void{
    this.getAplicacion();

  }
  enablePanel(): void {    
    this.topPage();
    this.submitted = false;
    this.tableActive = false;    
    if(this.currentAplicacion.id==null || this.currentAplicacion.id==''){
      this.tabActive=false;
    }
    else
    {
      this.tabActive=true;
    }
    console.log('this.tabActive'+this.tabActive);
  }
  disablePanel(): void{
    this.topPage();
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  topPage(): void{
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  cleanPanel(): void{
    this.title='';
    this.currentAplicacion = {id: '', nombreApl: '', descripcionApl:'', tipoApl:'', versionApl:'', estadoApl:'', responsableApl:'', criticidadApl:'', desarrolloApl:''};
    this.getAplicacion();
  }

  viewAplicacion(item: Aplicacion): void{
    this.editAplicacion(item);
    this.modeEdit = true;
  }

  editAplicacion(item: Aplicacion): void{
      this.modeEdit = false;
      this.enablePanel();
      this.title=item.nombreApl||'';
      setTimeout(() => {
        this.currentAplicacion = {id: item.id||'', nombreApl: item.nombreApl||'', descripcionApl:item.descripcionApl||'', tipoApl:item.tipoApl||''
        , versionApl:item.versionApl||'', estadoApl:item.estadoApl||'', responsableApl:item.responsableApl||'', criticidadApl:item.criticidadApl||'', desarrolloApl:item.desarrolloApl||''};
      }, 100);
      if(this.currentAplicacion.id==null || this.currentAplicacion.id==''){
        this.tabActive=true;
      }
      else
      {
        this.tabActive=false;
      }
      console.log('this.tabActive'+this.tabActive);

  }


  
  getAplicacion(): void {
    this.aplicacionService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaAplicacion = data;
          this.dataSource = new MatTableDataSource<Aplicacion>(this.respuestaAplicacion.body);
          this.mode = 'determinate';
          this.color = 'primary';
        },
        error: (er) => {
          this.createSnackBar(er.error.error.mensaje);
          this.mode = 'determinate';
          this.color = 'primary';
        }
      });
    }

  saveAplicacion(): void { 
    this.mode = 'indeterminate';
    this.color = 'accent';  
    console.log(this.currentAplicacion.id); 
    if(this.currentAplicacion.id==null || this.currentAplicacion.id=='')
    {
        this.aplicacionService.create(this.currentAplicacion)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getAplicacion();
              this.mode = 'determinate';
              this.color = 'primary';
            },
            error: (er) => 
            {
              console.error(er);
              this.mode = 'determinate';
              this.color = 'primary';
            }
          });
     }
     else{
      this.aplicacionService.update(this.currentAplicacion.id,this.currentAplicacion)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel()
            this.getAplicacion();
            this.mode = 'determinate';
            this.color = 'primary';
          },
          error: (er) => {
            console.error(er);
            this.mode = 'determinate';
            this.color = 'primary';
          }
        });

     }

    }



    getDetalleCatalogo(id: string): void {
      this.mode = 'indeterminate';
      this.color = 'accent';
      console.log(id);
      this.detalleCatalogoService.findByidCat(8)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoCrit = data;        
            this.detalleCatalogoCrit = this.respuestaCatalogoCrit.body as DetalleCatalogo[];
            this.mode = 'determinate';
            this.color = 'primary';
          },
          error: (er) => {
            this.createSnackBar(er.error.error.mensaje);          
            this.mode = 'determinate';
            this.color = 'primary';}
        });
        this.detalleCatalogoService.findByidCat(9)
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoDesa = data;        
              this.detalleCatalogoDesa = this.respuestaCatalogoDesa.body as DetalleCatalogo[];
              this.mode = 'determinate';
              this.color = 'primary';
            },
            error: (er) => {
              this.createSnackBar(er.error.error.mensaje);
              this.mode = 'determinate';
              this.color = 'primary';
            }
          });
      this.detalleCatalogoService.findByidCat(1)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoTipo = data;        
            this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
            this.mode = 'determinate';
            this.color = 'primary';
          },
          error: (er) => {
            this.createSnackBar(er.error.error.mensaje);
            this.mode = 'determinate';
            this.color = 'primary';
          }
        });
        this.detalleCatalogoService.findByidCat(2)
          .subscribe({
            next: (data) => {
              this.respuestaCatalogoEstado = data;        
              this.detalleCatalogoEstado = this.respuestaCatalogoEstado.body as DetalleCatalogo[];
              this.mode = 'determinate';
              this.color = 'primary';
            },
            error: (er) => {
              this.createSnackBar(er.error.error.mensaje);
              this.mode = 'determinate';
              this.color = 'primary';
            }
          });
    }

    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }


    searchTitle(): void {
      this.mode = 'indeterminate';
      this.color = 'accent';
      this.dataSource=new MatTableDataSource<Aplicacion>();
      if(this.title==null || this.title==''){
        this.getAplicacion();
      }
  else
  {
      this.aplicacionService.findByNameApl(this.title)
      .subscribe({
        next: (data) => {
          this.respuestaAplicacion = data;
          this.dataSource = new MatTableDataSource<Aplicacion>(this.respuestaAplicacion.body);
          this.mode = 'determinate';
          this.color = 'primary';
        },
        error: (er) => {
          this.createSnackBar(er.error.error.mensaje);
          this.mode = 'determinate';
          this.color = 'primary';
        }
      });
    }
    }
  

  }

