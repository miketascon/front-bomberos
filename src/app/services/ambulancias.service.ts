import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Ambulancias } from '../models/ambulancias';




@Injectable({
  providedIn: 'root'
})
export class AmbulanciasService {

  constructor(private http: HttpClient) { }


  create(ambulancias): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}ambulancias/save/`, { ambulancias });
  }

  find(): Observable<Ambulancias> {
      return this.http.get<Ambulancias>(`${Config.URL}ambulancias/find/`);
  }

  updateAmbulancias(id, ambulancias): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}ambulancias/update/` + id, { ambulancias });
  }

  findCasoByID(id): Observable<Ambulancias> {
     //
      return this.http.post<Ambulancias>(`${Config.URL}ambulancias/findAmbulanciaByID/`, {id});
  }

  deleteAmbulancias(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}ambulancias/delete/` + id );
  }
}
