import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/generico/credentials.model';
import { User } from 'src/app/models/usuarios/user.model';

const baseUrl = environment.urlBack + '/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(baseUrl + '/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  
  signOut(): Observable<any> {
    return this.http.get(baseUrl + '/signout', httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(baseUrl + '/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
