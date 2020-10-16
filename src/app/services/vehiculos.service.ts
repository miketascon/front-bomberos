import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Vehiculos } from '../models/vehiculos';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  headers: any;

  constructor(private http: HttpClient, public auth: AuthService) {
    this.headers = new HttpHeaders().set('token', this.auth.getToken());
   }

  create(vehiculos): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}vehiculos/save/`, { vehiculos }, {headers: this.headers});
  }

  find(): Observable<Vehiculos> {
      return this.http.get<Vehiculos>(`${Config.URL}vehiculos/find/`, {headers: this.headers});
  }

  updateVehiculos(id, vehiculos): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}vehiculos/update/` + id, { vehiculos }, {headers: this.headers});
  }

  findByID(id): Observable<Vehiculos> {
     //
      return this.http.post<Vehiculos>(`${Config.URL}vehiculos/findByID/`, {id}, {headers: this.headers});
  }

  deleteVehiculos(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}vehiculos/delete/` + id, {headers: this.headers} );
  }


}
