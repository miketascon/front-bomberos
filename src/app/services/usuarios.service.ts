import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../app/app.configuracion';
import { Observable } from 'rxjs';
import { Data } from '../models/Data';
import { User } from '../models/users';
import { Session } from '../models/sessions';
import { AuthService } from './auth.service';



@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    headers: any;

    constructor(private http: HttpClient, public auth: AuthService) {
      this.headers = new HttpHeaders().set('token', this.auth.getToken());
     }


      find(): Observable<User> {
        return this.http.get<User>(`${Config.URL}usuarios/find`, {headers: this.headers} );
      }

      findByUserId(id): Observable<User>  {
       return this.http.get<User>(`${Config.URL}usuarios/findByUserId/` + id, {headers: this.headers} );
      }

      findId(id) {
        return this.http.get(`${Config.URL}usuarios/` + id, {headers: this.headers});
      }

      findIduser(id): Observable<User> {
        return this.http.get<User>(`${Config.URL}usuarios/` + id, {headers: this.headers});
      }


      create(user): Observable<Data> {
        return this.http.post<Data>(`${Config.URL}usuarios/save/`, { user }, {headers: this.headers});
      }

      update(id, user): Observable<Data> {
        return this.http.put<Data>(`${Config.URL}usuarios/updateuser/` + id, { user }, {headers: this.headers});
      }

      updatePassword(id, password, nick): Observable<Data> {
        return this.http.put<Data>(`${Config.URL}usuarios/updatePassword/` + id, { password, nick }, {headers: this.headers});
      }

      verpass(nick, password): Observable<User> {
        return this.http.post<User>(`${Config.URL}usuarios/verpass/`,
         {nick, password}, {headers: this.headers});
      }


    deleteUser(id): Observable<Data> {
      // let headers = new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.delete<Data>(`${Config.URL}usuarios/delete/` + id,  {headers: this.headers} );
    }



}
