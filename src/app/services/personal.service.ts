import { Injectable } from '@angular/core';
import { Data } from '../models/Data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Personal } from '../models/personal';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }


  create(personal): Observable<Data> {
    console.log(personal);
    return this.http.post<Data>(`${Config.URL}personal/save/`, { personal });
  }

  find(): Observable<Personal> {
      return this.http.get<Personal>(`${Config.URL}personal/find/`);
  }

  updatepersonal(id, personal): Observable<Data> {
      return this.http.put<Data>(`${Config.URL}personal/update/` + id, { personal });
  }

  findPersonalByID(id): Observable<Personal> {
     //
      return this.http.post<Personal>(`${Config.URL}personal/findPersonalByID/`, {id});
  }

  deletePersonal(id): Observable<Data> {
     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete<Data>(`${Config.URL}personal/delete/` + id );
  }
}
