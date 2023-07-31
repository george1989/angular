import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';

const baseUrl = environment.urlBack + '/api/catalogo';

@Injectable({
  providedIn: 'root'
})
export class DetalleCatalogoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/detalle`);
  }

  findByidCat(cat: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/detalle/app/${cat}`);
  }
  
  create(data: any): Observable<ERespuestaSimple> {
    return this.http.post(`${baseUrl}/detalle/`, data);
  }

  update(id: any, data: any): Observable<ERespuestaSimple> {
    return this.http.put(`${baseUrl}/detalle/${id}`, data);
  }
}
