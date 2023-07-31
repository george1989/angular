import { Injectable } from '@angular/core';
import { User } from 'src/app/models/usuarios/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const TOKEN_LIFE = 'life-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    var currentDateObj = new Date();
    var numberOfMlSeconds = currentDateObj.getTime();
    var addMlSeconds = 28800000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(TOKEN_LIFE, newDateObj.getTime().toString()||'');
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)||'';
  }
  public getTimer(): number {
    return parseInt(sessionStorage.getItem(TOKEN_LIFE)||'',0);
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY)||'');
  }
}
