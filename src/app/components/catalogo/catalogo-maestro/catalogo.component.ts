import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/models/catalogo/catalogo.model';
import { CatalogoService } from 'src/app/services/catalogo/catalogo.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  selectedTabIndex = 0;
  selection = new SelectionModel<Catalogo>(false, []);
  displayedColumns: string[] = ['id', 'nombreApl', 'getDetalle', 'getEdit'];
  dataSource = new MatTableDataSource < Catalogo > ();
  respuestaCatalogo : ERespuesta = new ERespuesta;  
  submitted = true;
  tableActive = true;
  catalogo?: Catalogo[];
  currentCatalogo: Catalogo={};
  title = '';
  newCatalogo = {id: "", nombreCat:''};

  constructor(private catalogoService: CatalogoService,
    private _snackBar: MatSnackBar) { }

 
  ngOnInit(): void {
    this.getCatalogo();
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
      this.newCatalogo = {
          id: '',
          nombreCat: ''
      };
  }, 100);
}


editCatalogo(item: Catalogo): void {

  this.enablePanel();
setTimeout(() => {
this.newCatalogo = {
    id: item.id || '',
    nombreCat: item.nombreCat || ''
};
}, 100);


}

  getCatalogo(): void {
    this.catalogoService.getAll()
      .subscribe({
        next: (data) => {
          this.respuestaCatalogo = data;
            this.dataSource = new MatTableDataSource < Catalogo > (this.respuestaCatalogo.body);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }

  refreshList(): void {
    this.getCatalogo();
    this.currentCatalogo = {};
  }

  setActiveAplicacion(catalogo: Catalogo): void {
    this.currentCatalogo = catalogo; 
    this.selectedTabIndex = 1;
  }

  searchTitle(): void {
    this.dataSource=new MatTableDataSource<Catalogo>();
    if(this.title==null || this.title==''){
      this.refreshList();
    }
else
{
    this.catalogoService.findByNameCat(this.title)
    .subscribe({
      next: (data) => {
        this.respuestaCatalogo = data;
          this.dataSource = new MatTableDataSource < Catalogo > (this.respuestaCatalogo.body);
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
  }
  }

  saveCatalogo(): void {   
    if(this.newCatalogo.id==null || this.newCatalogo.id=='')
    {
        this.catalogoService.create(this.newCatalogo)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getCatalogo();
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.catalogoService.update(this.newCatalogo.id,this.newCatalogo)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.getCatalogo();
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
