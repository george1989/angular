import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';

const baseUrl = environment.urlBack + '/api/documentacion-aplicacion';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionAplicacionService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/all`);
  }
  
  create(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/`, data);
  }

  update(id: any, data: any): Observable<ERespuestaSimple> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  
  findByidMat(mat: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/matriz/${mat}`);
  }

}
