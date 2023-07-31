import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUsuariosService } from 'src/app/services/usuarios/admin-usuarios.service';
import { TokenStorageService } from '../../../services/generico/token-storage.service';
import { User } from 'src/app/models/usuarios/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../services/generico/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  passwordCon = '';
  user = new User();
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router,
      private _snackBar: MatSnackBar,
      private authentocationService: AuthenticationService,
      private adminUsuariosservice: AdminUsuariosService, private tokenStorage: TokenStorageService) {}

  ngOnInit() {
      this.user.username = this.tokenStorage.getUser().username;
      this.user.email = this.tokenStorage.getUser().email;
      this.user.state = this.tokenStorage.getUser().state;
      this.user.id = this.tokenStorage.getUser().id;
      if (this.tokenStorage.getToken() != '' && this.tokenStorage.getToken() != null) {
          this.roles = this.tokenStorage.getUser().roles;
      }
  }

  updateUser() {
      if (this.passwordCon != this.user.password) {
          this.createSnackBar('Las contraseñas ingresadas no coinciden.');
          return;
      }
      this.adminUsuariosservice.updatep(this.user).subscribe(
          data => {
              console.log(data);
              this.user = new User();
              this.passwordCon = '';
              this.createSnackBar('Registro de usuario exitoso.');
              this.authentocationService.signOut();
              this.tokenStorage.signOut();
              this.router.navigate(['login']);
              window.location.reload();
          },
          err => {
              try {
                  this.createSnackBar(err.error.message);
              } catch (error) {
                  this.createSnackBar('Error de acceso.');
              }
          }
      );

  }


  createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje, 'OK', {
          duration: 3000
      });
  }
}