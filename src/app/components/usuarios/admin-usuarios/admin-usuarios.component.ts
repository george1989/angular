import { Component, OnInit } from '@angular/core';
import { AdminUsuarios } from 'src/app/models/usuarios/admin-usuarios.model';
import { User } from 'src/app/models/usuarios/user.model';
import { AdminUsuariosService } from 'src/app/services/usuarios/admin-usuarios.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import {MatSnackBar} from '@angular/material/snack-bar'
import { DetalleCatalogo } from 'src/app/models/catalogo/detalle-catalogo.model';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {FormControl} from '@angular/forms';

export class Rol {
  id?: any;
  name?: string;   
}

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  
  rolgs = new FormControl('');
  rolList: string[] = ['ROLE_MODERATOR', 'ROLE_USER', 'ROLE_ADMIN'];
  //rolList: Rol[] =[{"id":2,"name":"ROLE_MODERATOR"},{"id":1,"name":"ROLE_USER"},{"id":3,"name":"ROLE_ADMIN"}];
  selectedTabIndex = 0;
  selection = new SelectionModel<User>(false, []);
  displayedColumns: string[] = ['id', 'username','email', 'password', 'role','state', 'getReset','getEdit'];
  dataSource = new MatTableDataSource < User > ();
  respuestaUser : ERespuesta = new ERespuesta;  
  submitted = true;
  editEnable = true;
  tableActive = true;
  editUsuario = false;
  usuarios?: AdminUsuarios[];
  usuariosDep?: User[]=[];
  currentUser: User={};
  editUser: User={};
  userItem: User={};
  rol: Rol[]=[]
  title = '';
  hide = true;
  passwordCon = '';
  constructor(private adminUsuarioService: AdminUsuariosService,
    private _snackBar: MatSnackBar,
    private detalleCatalogoService: DetalleCatalogoService) { }

 
  ngOnInit(): void {
    this.getUser();
  }

  enablePanel(): void {
    this.submitted = false;
    this.tableActive = false;
    this.cleanPanel();
  }
  enablePanelEdit(): void {
    this.submitted = true;
    this.editEnable = false;
    this.tableActive = false;
    this.cleanPanel();
  }
  disablePanel(): void{
    this.submitted = true;
    this.editEnable = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.editUsuario=false;    
    this.passwordCon = '';
    setTimeout(() => {
    this.currentUser = {
        id: '',
        username: '',
        email: '',
        password:'', 
        role:[]
    };
  }, 100);
}

setActiveHome(): void {
  this.selectedTabIndex = 0;
}
setTitulo(item: User): void{
  //this.catalogoTecnologia = <DetalleCatalogo>this.detalleCatalogoTecnologia.find(el => el.id == item.email);
  this.title='';//this.catalogoTecnologia.nombreDet||'';
}

selecEditUser(item: User): void {
    this.editUsuario=true;
    this.enablePanelEdit();
    setTimeout(() => {
    this.editUser = {
        id: item.id || '',
        username: item.username || '',
        email: item.email || '',
        password: item.password || '',
        state: item.state || '',
        role: item.role 
    };
    }, 100);
}

  getUser(): void {
    this.usuariosDep=[];
    this.dataSource = new MatTableDataSource < User >;
    this.adminUsuarioService.getAll()
      .subscribe({
        next: (data) => {
          //this.respuestaUser = data;
          this.usuarios = data.body as AdminUsuarios[];
          for (var us in this.usuarios) {
            this.userItem.id=this.usuarios[us].id;
            this.userItem.username=this.usuarios[us].username;
            this.userItem.email=this.usuarios[us].email;
            this.userItem.password=this.usuarios[us].password;
            this.userItem.state=this.usuarios[us].state;
            this.userItem.role=[];
            this.rol=this.usuarios[us].roles||[];
            for (var r in this.rol) {         
              this.userItem.role.push(this.rol[r].name||'');
            }
            this.usuariosDep?.push(this.userItem);
            this.userItem={};
        }
            this.dataSource = new MatTableDataSource < User > (this.usuariosDep);
        },
        error: (er) => {this.createSnackBar(er.error.error.mensaje);}
      });
  }

  refreshList(): void {
    this.getUser();
    this.currentUser = {};
  }

  setActiveAplicacion(item: User): void {
    this.setTitulo(item);
    this.currentUser = item; 
    this.selectedTabIndex = 1;
  }
  setActiveRecursos(item: User): void {
    this.setTitulo(item);
    this.currentUser = item; 
    this.selectedTabIndex = 2;
  }

  setResetUser(item: User): void {
    this.adminUsuarioService.reset(item)
    .subscribe({
      next: (data) => {
        this.usuarios = data.body as AdminUsuarios[];
        for (var us in this.usuarios) {
          this._snackBar.open('Nueva Contraseña: '+this.usuarios[us].password||'','OK',{
            duration: 10000
          });
      }
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
  }


  editDataUser(): void {
    this.adminUsuarioService.update(this.editUser)
    .subscribe({
      next: (res) => {
        this.createSnackBar('Guardado Exitoso.');
        this.disablePanel();
        this.getUser();
      },
      error: (er) => {this.createSnackBar(er.error.error.mensaje);}
    });
  }


  saveUser(): void {   

      if(this.passwordCon!=this.currentUser.password)
      {
        this.createSnackBar('Las contraseñas ingresadas no coinciden.');
        return;
      }
        this.adminUsuarioService.create(this.currentUser)
          .subscribe({
            next: (res) => {
              this.createSnackBar('Guardado Exitoso.');
              this.disablePanel();
              this.getUser();
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
