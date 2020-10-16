import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Acuartelados } from '../models/acuartelados';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AcuarteladosService {
  token: string;
  headers: any;

  constructor(private http: HttpClient,  public auth: AuthService) {
    this.token =  this.auth.getToken();
    this.headers = new HttpHeaders().set('token', this.token);
  }

  create(acuartelados): Observable<Data> {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.post<Data>(`${Config.URL}acuartelados/save/`, { acuartelados }, httpOptions);
  }

  find(): Observable<Acuartelados> {

    const httpOptions = {
      headers: this.headers
    };
    return this.http.get<Acuartelados>(`${Config.URL}acuartelados/find/`, httpOptions);
  }

  updateAcuartelados(id, acuartelados): Observable<Data> {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.put<Data>(`${Config.URL}acuartelados/update/` + id, { acuartelados }, {headers: this.headers});
  }

  findByID(id): Observable<Acuartelados> {
    const httpOptions = {
      headers: this.headers
    };
     //
    return this.http.post<Acuartelados>(`${Config.URL}acuartelados/findByID/`, {id}, httpOptions);
  }

  deleteAcuartelados(id): Observable<Data> {
    const httpOptions = {
      headers: this.headers
    };
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<Data>(`${Config.URL}acuartelados/delete/` + id,  {headers: this.headers} );
  }
}
