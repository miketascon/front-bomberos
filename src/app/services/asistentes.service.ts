import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Asistentes } from '../models/asistentes';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AsistentesService {
  headers: any;

  constructor(private http: HttpClient, public auth: AuthService) {
    this.headers = new HttpHeaders().set('token', this.auth.getToken());
   }

  create(asistentes): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}asistentes/save/`, { asistentes }, {headers: this.headers});
  }

  find(): Observable<Asistentes> {
      return this.http.get<Asistentes>(`${Config.URL}asistentes/find/`, {headers: this.headers});
  }

  updateAsistentes(id, asistentes): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}asistentes/update/` + id, { asistentes }, {headers: this.headers});
  }

  findByID(id): Observable<Asistentes> {
     //
      return this.http.post<Asistentes>(`${Config.URL}asistentes/findByID/`, {id}, {headers: this.headers});
  }

  deleteAsistentes(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}asistentes/delete/` + id, {headers: this.headers});
  }

}
