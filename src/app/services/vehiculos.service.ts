import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Vehiculos } from '../models/vehiculos';


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(private http: HttpClient) { }

  create(vehiculos): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}vehiculos/save/`, { vehiculos });
  }

  find(): Observable<Vehiculos> {
      return this.http.get<Vehiculos>(`${Config.URL}vehiculos/find/`);
  }

  updateVehiculos(id, vehiculos): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}vehiculos/update/` + id, { vehiculos });
  }

  findByID(id): Observable<Vehiculos> {
     //
      return this.http.post<Vehiculos>(`${Config.URL}vehiculos/findByID/`, {id});
  }

  deleteVehiculos(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}vehiculos/delete/` + id );
  }


}
