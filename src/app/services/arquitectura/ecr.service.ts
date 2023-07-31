import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';

const baseUrl = environment.urlBack + '/api/ecr';
@Injectable({
  providedIn: 'root'
})
export class EcrService {
  constructor(private http: HttpClient) { }

  getList(data: any): Observable<ERespuesta> {
    return this.http.post(`${baseUrl}/list`, data);
  }
  
  getReport(data: any): Observable<ERespuesta> {
    return this.http.post(`${baseUrl}/report`, data);
  }
}
