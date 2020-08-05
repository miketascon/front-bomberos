import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Lesionados } from '../models/lesionados';


@Injectable({
  providedIn: 'root'
})
export class LesionadosService {

  constructor(private http: HttpClient) { }

  create(lesionados): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}lesionados/save/`, { lesionados });
  }

  find(): Observable<Lesionados> {
      return this.http.get<Lesionados>(`${Config.URL}lesionados/find/`);
  }

  updateLesionados(id, lesionados): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}lesionados/update/` + id, { lesionados });
  }

  findByID(id): Observable<Lesionados> {
     //
      return this.http.post<Lesionados>(`${Config.URL}lesionados/findByID/`, {id});
  }

  deleteLesionados(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}lesionados/delete/` + id );
  }

}
