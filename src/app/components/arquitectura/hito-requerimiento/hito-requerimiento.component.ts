import { Component, OnInit } from '@angular/core';
import { HitoRequerimiento } from 'src/app/models/arquitectura/hito-requerimiento.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { HitoRequerimientoService } from 'src/app/services/arquitectura/hito-requerimiento.service';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import{EventEmitter} from '@angular/core';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-hito-requerimiento',
  templateUrl: './hito-requerimiento.component.html',
  styleUrls: ['./hito-requerimiento.component.css']
})
export class HitoRequerimientoComponent implements OnInit {



  displayedColumns: string[] = ['id', 'etapaHit', 'concideracionHit', 'metodologiaHit', 'getEdit'];
  dataSource = new MatTableDataSource<HitoRequerimiento>();
  currentHitoRequerimiento = {id: '', etapaHit: '', concideracionHit:'', metodologiaHit:''};
  submitted = true;
  tableActive = true;
  title = '';
  tabActive=true;
  clickedRows = new Set<HitoRequerimiento>();
  selection = new SelectionModel<HitoRequerimiento>(false, []);
  detalleCatalogoEtapa: DetalleCatalogo[] = [];
  respuestaCatalogoEtapa : ERespuesta = new ERespuesta
  detalleCatalogoMetodo: DetalleCatalogo[] = [];
  respuestaCatalogoMetodo : ERespuesta = new ERespuesta
  respuestaHitoRequerimiento : ERespuesta = new ERespuesta

  constructor(private servidorService: HitoRequerimientoService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {    
    this.getHitoRequerimiento();
    this.getDetalleCatalogo('1');
  }

  ngOnChanges(): void{
    this.getHitoRequerimiento();

  }
  enablePanel(): void {
    this.submitted = false;
    this.tableActive = false;    
    if(this.currentHitoRequerimiento.id==null || this.currentHitoRequerimiento.id==''){
      this.tabActive=false;
    }
    else
    {
      this.tabActive=true;
    }
    console.log('this.tabActive'+this.tabActive);
  }
  disablePanel(): void{
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.currentHitoRequerimiento = {id: '', etapaHit: '', concideracionHit:'', metodologiaHit:''};
  }

  editHitoRequerimiento(item: HitoRequerimiento): void{
      this.enablePanel();
      setTimeout(() => {
        this.currentHitoRequerimiento = {
          id: item.id||'', 
          etapaHit: item.etapaHit||'', 
          concideracionHit:item.concideracionHit||'', 
          metodologiaHit:item.metodologiaHit||''
        };
      }, 100);
      if(this.currentHitoRequerimiento.id==null || this.currentHitoRequerimiento.id==''){
        this.tabActive=true;
      }
      else
      {
        this.tabActive=false;
      }
      console.log('this.tabActive'+this.tabActive);

  }


  
  getHitoRequerimiento(): void {
    this.servidorService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaHitoRequerimiento = data;
          this.dataSource = new MatTableDataSource<HitoRequerimiento>(this.respuestaHitoRequerimiento.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }

  saveHitoRequerimiento(): void {   
    console.log(this.currentHitoRequerimiento.id); 
    if(this.currentHitoRequerimiento.id==null || this.currentHitoRequerimiento.id=='')
    {
        this.servidorService.create(this.currentHitoRequerimiento)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getHitoRequerimiento();
            },
            error: (er) => console.error(er)
          });
     }
     else{
      this.servidorService.update(this.currentHitoRequerimiento.id,this.currentHitoRequerimiento)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel()
            this.getHitoRequerimiento();
          },
          error: (er) => console.error(er)
        });

     }

    }



    getDetalleCatalogo(id: string): void {
      console.log(id);
      this.detalleCatalogoService.findByidCat(16)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoEtapa = data;        
            this.detalleCatalogoEtapa = this.respuestaCatalogoEtapa.body as DetalleCatalogo[];
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


  }

