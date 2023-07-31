import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';

const baseUrl = environment.urlBack + '/api/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuariosService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/all`);
  }
  
  create(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/`, data);
  }

  update(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/update`, data);
  }
  
  reset(data: any): Observable<ERespuesta> {
    return this.http.post<ERespuesta>(`${baseUrl}/reset`, data);
  }
  
  updatep(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/updatep`, data);
  }
}
