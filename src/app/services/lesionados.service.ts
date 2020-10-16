import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Lesionados } from '../models/lesionados';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LesionadosService {
  headers: any;

  constructor(private http: HttpClient, public auth: AuthService) {
    this.headers = new HttpHeaders().set('token', this.auth.getToken());
   }

  create(lesionados): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}lesionados/save/`, { lesionados }, {headers: this.headers});
  }

  find(): Observable<Lesionados> {
      return this.http.get<Lesionados>(`${Config.URL}lesionados/find/`, {headers: this.headers});
  }

  updateLesionados(id, lesionados): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}lesionados/update/` + id, { lesionados }, {headers: this.headers});
  }

  findByID(id): Observable<Lesionados> {
     //
      return this.http.post<Lesionados>(`${Config.URL}lesionados/findByID/`, {id}, {headers: this.headers});
  }

  deleteLesionados(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}lesionados/delete/` + id , {headers: this.headers});
  }

}
