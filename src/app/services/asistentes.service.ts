import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Asistentes } from '../models/asistentes';


@Injectable({
  providedIn: 'root'
})
export class AsistentesService {

  constructor(private http: HttpClient) { }

  create(asistentes): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}asistentes/save/`, { asistentes });
  }

  find(): Observable<Asistentes> {
      return this.http.get<Asistentes>(`${Config.URL}asistentes/find/`);
  }

  updateAsistentes(id, asistentes): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}asistentes/update/` + id, { asistentes });
  }

  findByID(id): Observable<Asistentes> {
     //
      return this.http.post<Asistentes>(`${Config.URL}asistentes/findByID/`, {id});
  }

  deleteAsistentes(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}asistentes/delete/` + id );
  }

}
