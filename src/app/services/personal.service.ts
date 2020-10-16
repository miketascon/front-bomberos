import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Personal } from '../models/personal';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  headers: any;

  constructor(private http: HttpClient, public auth: AuthService) {
    this.headers = new HttpHeaders().set('token', this.auth.getToken());
   }

  create(personal): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}personal/save/`, { personal }, {headers: this.headers});
  }

  find(): Observable<Personal> {
      return this.http.get<Personal>(`${Config.URL}personal/find/`, {headers: this.headers});
  }

  updatepersonal(id, personal): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}personal/update/` + id, { personal }, {headers: this.headers});
  }

  findPersonalByID(id): Observable<Personal> {
     //
      return this.http.post<Personal>(`${Config.URL}personal/findPersonalByID/`, {id}, {headers: this.headers});
  }

  deletePersonal(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}personal/delete/` + id, {headers: this.headers} );
  }
}
