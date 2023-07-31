import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aplicacion } from '../../models/aplicacion/aplicacion.model';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';

const baseUrl = environment.urlBack + '/api/aplicacion';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

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

  findByNameApl(cat: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/filtro/${cat}`);
  }
  getAllDetalle(): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/detalles/all`);
  }

  findByidApp(app: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/detalles/${app}`);
  }
  
  createDetalle(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/detalles/`, data);
  }

  updateDetalle(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/detalles/${id}`, data);
  }
}
