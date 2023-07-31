import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor.model';
import { ServidorService } from 'src/app/services/servidor.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreSer', 'ipSer', 'ssoSer', 'detalleSer', 'getEdit'];
  //dataSource : any;
  dataSource = new MatTableDataSource<Servidor>();
  newServidor = {id: "", nombreSer: "", ipSer:'', ssoSer:'', detalleSer:''};
  submitted = true;
  tableActive = true;
  respuestaServicio : ERespuesta = new ERespuesta;
  clickedRows = new Set<Servidor>();
  selection = new SelectionModel<Servidor>(false, []);  
  detalleCatalogoSO: DetalleCatalogo[] = [];
  respuestaCatalogoSO : ERespuesta = new ERespuesta;

  constructor(private servidorService: ServidorService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {    
    this.getDetalleCatalogo();
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
    this.newServidor = {
      id: '', nombreSer: '', ipSer:'', ssoSer:'', detalleSer:''
    };
  }, 100);
}



  editServidor(item: Servidor): void{
    this.enablePanel();
    setTimeout(() => {
      this.newServidor = {id: item.id||'', nombreSer: item.nombreSer||'', ipSer:item.ipSer||'', ssoSer:item.ssoSer||'', detalleSer:item.detalleSer||''};
    }, 100);
  }

  ngCargarTabla(): void {
    this.servidorService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaServicio = data;
          this.dataSource = new MatTableDataSource<Servidor>(this.respuestaServicio.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    }

  saveServidor(): void {   
    console.log(this.newServidor.id); 
    if(this.newServidor.id==null || this.newServidor.id=='')
    {
        this.servidorService.create(this.newServidor)
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
      this.servidorService.update(this.newServidor.id,this.newServidor)
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
      this.detalleCatalogoService.findByidCat(7)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoSO = data;        
            this.detalleCatalogoSO = this.respuestaCatalogoSO.body as DetalleCatalogo[];
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

