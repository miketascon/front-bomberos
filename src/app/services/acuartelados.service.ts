import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Acuartelados } from '../models/acuartelados';


@Injectable({
  providedIn: 'root'
})
export class AcuarteladosService {

  constructor(private http: HttpClient) { }

  create(acuartelados): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}acuartelados/save/`, { acuartelados });
  }

  find(): Observable<Acuartelados> {
      return this.http.get<Acuartelados>(`${Config.URL}acuartelados/find/`);
  }

  updateAcuartelados(id, acuartelados): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}acuartelados/update/` + id, { acuartelados });
  }

  findByID(id): Observable<Acuartelados> {
     //
      return this.http.post<Acuartelados>(`${Config.URL}acuartelados/findByID/`, {id});
  }

  deleteAcuartelados(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}acuartelados/delete/` + id );
  }
}
