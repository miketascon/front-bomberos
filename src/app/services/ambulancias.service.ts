import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Ambulancias } from '../models/ambulancias';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class AmbulanciasService {
  headers: any;

  constructor(private http: HttpClient,  public auth: AuthService) {
    this.headers = new HttpHeaders().set('token', this.auth.getToken());
  }


  create(ambulancias): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}ambulancias/save/`, { ambulancias }, {headers: this.headers});
  }

  find(): Observable<Ambulancias> {
      return this.http.get<Ambulancias>(`${Config.URL}ambulancias/find/`, {headers: this.headers});
  }

  updateAmbulancias(id, ambulancias): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}ambulancias/update/` + id, { ambulancias },  {headers: this.headers});
  }

  findCasoByID(id): Observable<Ambulancias> {
     //
      return this.http.post<Ambulancias>(`${Config.URL}ambulancias/findAmbulanciaByID/`, {id},  {headers: this.headers});
  }

  deleteAmbulancias(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}ambulancias/delete/` + id,  {headers: this.headers} );
  }
}
