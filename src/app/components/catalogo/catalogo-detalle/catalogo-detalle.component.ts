import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'


@Component({
  selector: 'app-catalogo-detalle',
  templateUrl: './catalogo-detalle.component.html',
  styleUrls: ['./catalogo-detalle.component.css']
})
export class CatalogoDetalleComponent implements OnInit {
  @Input() viewMode = false;
  @Input() idCatalogo = '';
  @Input() nomCatalogo:string = '';
  message = '';

  displayedColumns: string[] = ['id', 'idCat', 'nombreDet', 'getEdit'];
  dataSource = new MatTableDataSource<DetalleCatalogo>();
  newDetalleCatalogo = {id: "", idCat:this.idCatalogo, nombreDet:''};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<DetalleCatalogo>();
  selection = new SelectionModel<DetalleCatalogo>(false, []);
  respuestaDetalleCatalogo : ERespuesta = new ERespuesta;
  

  constructor(
    private detalleCatalogoService: DetalleCatalogoService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  
  ngOnInit(): void {
    console.log('CatalogoDetalleComponent');
    if (this.viewMode) {
      this.message = '';
      this.getDetalleCatalogo(this.idCatalogo);
    }
  }
  ngOnChanges(): void
  {
    console.log(this.viewMode);
    if (this.viewMode) {
      this.message = '';
      this.getDetalleCatalogo(this.idCatalogo);
      
    }

  }

  enablePanel(): void {
    console.log(this.idCatalogo);
    if(this.idCatalogo=='' || this.idCatalogo==null){
      this._snackBar.open('Primero debe seleccionar un catalogo.','OK',{
        duration: 3000
      });
      return;
    }

    this.submitted = false;
    this.tableActive = false;
    setTimeout(() => {
        this.newDetalleCatalogo = {
            id: '',
            idCat: this.idCatalogo,
            nombreDet: ''
        };
    }, 100);
  }
  disablePanel(): void{
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.newDetalleCatalogo = {
        id: '',
        idCat: this.idCatalogo,
        nombreDet: ''
    };
}

  getDetalleCatalogo(id: string): void {
    this.dataSource = new MatTableDataSource<DetalleCatalogo>();
    this.newDetalleCatalogo = {id: "", idCat:this.idCatalogo, nombreDet:''};
    this.detalleCatalogoService.findByidCat(id)
      .subscribe({
        next: (data) => {
          this.respuestaDetalleCatalogo = data;
          this.dataSource = new MatTableDataSource <DetalleCatalogo> (this.respuestaDetalleCatalogo.body);
          console.log(data);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }


  saveDetalleCatalogo(): void {   
    console.log(this.newDetalleCatalogo.id); 
    if(this.newDetalleCatalogo.id==null || this.newDetalleCatalogo.id=='')
    {
        this.detalleCatalogoService.create(this.newDetalleCatalogo)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getDetalleCatalogo(this.idCatalogo);
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.detalleCatalogoService.update(this.newDetalleCatalogo.id,this.newDetalleCatalogo)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.getDetalleCatalogo(this.idCatalogo);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });

     }
    }
    
     editDetalleCatalogo(item: DetalleCatalogo): void{
         this.enablePanel();
         setTimeout(() => {
          this.newDetalleCatalogo = {id: item.id||'', idCat: item.idCat||'', nombreDet:item.nombreDet||''};
        }, 100);
     }
     createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }
}
