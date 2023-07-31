import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/generico/authentication.service';
import { TokenStorageService } from '../../../services/generico/token-storage.service';
import { Credentials } from 'src/app/models/generico/credentials.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  login = new Credentials();
  invalidLogin = false
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 75;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private loginservice: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()==null||this.tokenStorage.getToken()=='') {
      console.log('Login necesario');
    }
    else{
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['']);
    }
  }
   
    checkLogin() {      
    this.mode = 'indeterminate';
    this.loginservice.login(this.login).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.createSnackBar('Inicio de sesión exitoso');
        setTimeout(() => {
          window.location.reload();
      }, 100);
      },
      err => {
        this.createSnackBar(err.error.message);
        this.mode = 'determinate';
      }
    );
    
  }

  createSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje,'OK',{
      duration: 2000
    });
  }

}




