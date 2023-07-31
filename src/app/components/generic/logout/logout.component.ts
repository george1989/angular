import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/generico/authentication.service';
import { TokenStorageService } from '../../../services/generico/token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentocationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit() {
    this.authentocationService.signOut();
    this.tokenStorage.signOut();
    this.router.navigate(['login']);
    window.location.reload();
    this.createSnackBar('Fin de sesión exitoso');
  }

  createSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje,'OK',{
      duration: 2000
    });
  }
}