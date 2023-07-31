import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstandarLogica } from 'src/app/models/arquitectura/estandar-logica.model';
import { EstandarLogicaService } from 'src/app/services/arquitectura/estandar-logica.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';

@Component({
  selector: 'app-estandar-logica',
  templateUrl: './estandar-logica.component.html',
  styleUrls: ['./estandar-logica.component.css']
})
export class EstandarLogicaComponent implements OnInit {
  @Input() viewMode = false;
  @Input() idEstandar = '';
  @Input() nomEstandar:string = '';
  message = '';

  displayedColumns: string[] = ['id','idEst', 'componenteElo', 'descripcionElo', 'expresionUnoElo', 'expresionDosElo', 'expresionTresElo', 'getEdit'];
  dataSource = new MatTableDataSource<EstandarLogica>();
  newEstandarLogica = {id: "", idEst:this.idEstandar, componenteElo:'', descripcionElo:'', expresionUnoElo:'', expresionDosElo:'', expresionTresElo:''};
  submitted = true;
  tableActive = true;
  clickedRows = new Set<EstandarLogica>();
  selection = new SelectionModel<EstandarLogica>(false, []);
  respuestaEstandarLogica : ERespuesta = new ERespuesta;
 

  constructor(
    private estandarLogicaService: EstandarLogicaService,
    private detalleCatalogoService: DetalleCatalogoService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  
  ngOnInit(): void {
    console.log('Carga EstandarLogica');
    if (this.viewMode) {
      this.message = '';
      this.getEstandarLogica(this.idEstandar);

    }
  }
  ngOnChanges(): void
  {
    console.log(this.viewMode);
    if (this.viewMode) {
      this.message = '';
      this.getEstandarLogica(this.idEstandar);
      
    }

  }

  enablePanel(): void {
    console.log(this.idEstandar);
    if(this.idEstandar=='' || this.idEstandar==null){
      this._snackBar.open('Primero debe seleccionar un catalogo.','OK',{
        duration: 3000
      });
      return;
    }

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
      this.newEstandarLogica = {
        id: "", idEst:this.idEstandar, componenteElo:'', descripcionElo:'', expresionUnoElo:'', expresionDosElo:'', expresionTresElo:''
      };
  }, 100);
}

  getEstandarLogica(id: string): void {
    if(this.idEstandar==null || this.idEstandar==''){
      return;
    }
    this.dataSource = new MatTableDataSource<EstandarLogica>();
    this.cleanPanel();
    this.estandarLogicaService.findByidEst(id)
      .subscribe({
        next: (data) => {
          this.respuestaEstandarLogica = data;
          this.dataSource = new MatTableDataSource <EstandarLogica> (this.respuestaEstandarLogica.body);
          console.log(data);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }


  saveEstandarLogica(): void {   
    console.log(this.newEstandarLogica.id); 
    if(this.newEstandarLogica.id==null || this.newEstandarLogica.id=='')
    {
        this.estandarLogicaService.create(this.newEstandarLogica)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getEstandarLogica(this.idEstandar);
            },
            error: (er) => {this.createSnackBar(er.error.error.mensaje);}
          });
     }
     else{
      this.estandarLogicaService.update(this.newEstandarLogica.id,this.newEstandarLogica)
        .subscribe({
          next: (res) => {
            this.createSnackBar('Guardado Exitoso.');
            this.disablePanel();
            this.getEstandarLogica(this.idEstandar);
          },
          error: (er) => {this.createSnackBar(er.error.error.mensaje);}
        });

     }
    }
    
     editEstandarLogica(item: EstandarLogica): void{
         this.enablePanel();
         setTimeout(() => {
          this.newEstandarLogica = {
          id: item.id||'',
          idEst: item.idEst||'', 
          componenteElo: item.componenteElo||'',
          descripcionElo: item.descripcionElo||'',
          expresionUnoElo: item.expresionUnoElo||'',
          expresionDosElo: item.expresionDosElo||'',
          expresionTresElo: item.expresionTresElo||''};
        }, 100);
     }
     createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }

}
