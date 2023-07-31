import { Component, OnInit } from '@angular/core';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { AplicacionService } from 'src/app/services/aplicacion/aplicacion.service';
import { AplicacionDetailsComponent } from 'src/app/components/aplicacion/aplicacion-details/aplicacion-details.component';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-aplicacion-list',
  templateUrl: './aplicacion-list.component.html',
  styleUrls: ['./aplicacion-list.component.css']
})
export class AplicacionListComponent implements OnInit {

  aplicacion?: Aplicacion[];
  currentAplicacion: Aplicacion = {};
  respuestaAplicacion: ERespuesta = new ERespuesta;
  currentIndex = -1;
  title = '';
  estadoListado=true;
  estadoDetalle=false;

  constructor(
    private _snackBar: MatSnackBar,
    private aplicacionService: AplicacionService) 
    { }

    
  ngOnInit(): void {
    this.retrieveAplicacions();
  }

  activaListado(){
    this.estadoListado=true;
    this.estadoDetalle=false;
  }
  retrieveAplicacions(): void {
    this.aplicacionService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaAplicacion = data;        
          this.aplicacion = this.respuestaAplicacion.body as Aplicacion[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }

  refreshList(): void {
    this.retrieveAplicacions();
    this.currentAplicacion = {};
    this.currentIndex = -1;
  }

  setActiveAplicacion(app: Aplicacion, index: number): void {
    this.currentAplicacion = app;
    this.title=app.nombreApl||'';
    this.currentIndex = index;
    this.estadoListado=false;
    this.estadoDetalle=true;
  }


  searchTitle(): void {
    this.aplicacion=[];
    if(this.title==null || this.title==''){
      this.refreshList();
    }
else
{
    this.aplicacionService.findByNameApl(this.title)
    .subscribe({
      next: (data) => {
        this.respuestaAplicacion = data;        
        this.aplicacion = this.respuestaAplicacion.body as Aplicacion[];
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
  
}
