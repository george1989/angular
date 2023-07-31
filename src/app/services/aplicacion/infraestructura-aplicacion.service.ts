import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';
import { environment } from '../../../environments/environment';

const baseUrl = environment.urlBack + '/api/infraestructura';

@Injectable({
  providedIn: 'root'
})
export class InfraestructuraAplicacionService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/app/all`);
  }
  
  create(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/`, data);
  }

  update(id: any, data: any): Observable<ERespuestaSimple> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  findByidApp(cat: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/app/${cat}`);
  }
}
