import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse,HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import { ERespuestaSimple } from 'src/app/models/generico/erespuesta-simple.model';

const baseUrl = environment.urlBack + '/api/recurso';
const baseUrlS3 = environment.urlBack + '/api/s3';

@Injectable({
  providedIn: 'root'
})
export class RecursoAplicacionService {
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
  
  findByidApp(app: any): Observable<ERespuesta> {
    return this.http.get<ERespuesta>(`${baseUrl}/app/${app}`);
  }
  
  upload(formData: FormData): Observable<ERespuesta> {
    return this.http.post<any>(`${baseUrlS3}/upload/`, formData);
  }
  
  file(formData: FormData) {
    var blob;
    const endpoint = `${baseUrlS3}/file/`
    const req = new HttpRequest('POST', endpoint, formData, { reportProgress: true, responseType: 'blob'})
    return this.http.request(req)
    
    //return blob;

    //return this.http.post(`${baseUrlS3}/file/`, formData, { responseType: 'blob' });
  }
}
