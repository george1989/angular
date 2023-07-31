import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aplicacion } from 'src/app/models/aplicacion/aplicacion.model';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-informacion-aplicacion',
  templateUrl: './informacion-aplicacion.component.html',
  styleUrls: ['./informacion-aplicacion.component.css']
})
export class InformacionAplicacionComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentAplicacion: Aplicacion = {
    nombreApl: '',
    descripcionApl: '',
    estadoApl: ''
  };
  detalleCatalogoEstado: DetalleCatalogo[] = [];
  respuestaCatalogoEstado : ERespuesta = new ERespuesta
  detalleCatalogoTipo: DetalleCatalogo[] = [];
  respuestaCatalogoTipo : ERespuesta = new ERespuesta
  detalleCatalogoCrit: DetalleCatalogo[] = [];
  respuestaCatalogoCrit : ERespuesta = new ERespuesta
  detalleCatalogoDesa: DetalleCatalogo[] = [];
  respuestaCatalogoDesa : ERespuesta = new ERespuesta
  message = '';

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private detalleCatalogoService: DetalleCatalogoService) { }

  
  ngOnInit(): void {
      this.getDetalleCatalogo();
  }


  getDetalleCatalogo(): void {
    
    this.detalleCatalogoService.findByidCat(8)
    .subscribe({
      next: (data) => {
        this.respuestaCatalogoCrit = data;        
        this.detalleCatalogoCrit = this.respuestaCatalogoCrit.body as DetalleCatalogo[];
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
    this.detalleCatalogoService.findByidCat(9)
      .subscribe({
        next: (data) => {
          this.respuestaCatalogoDesa = data;        
          this.detalleCatalogoDesa = this.respuestaCatalogoDesa.body as DetalleCatalogo[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
    this.detalleCatalogoService.findByidCat(1)
      .subscribe({
        next: (data) => {
          this.respuestaCatalogoTipo = data;        
          this.detalleCatalogoTipo = this.respuestaCatalogoTipo.body as DetalleCatalogo[];
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
      this.detalleCatalogoService.findByidCat(2)
        .subscribe({
          next: (data) => {
            this.respuestaCatalogoEstado = data;        
            this.detalleCatalogoEstado = this.respuestaCatalogoEstado.body as DetalleCatalogo[];
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });
  }
  createSnackBar(mensaje: string): void {
    this._snackBar.open('Infraestructura: '+mensaje,'OK',{
      duration: 2000
    });
  }
  
}
