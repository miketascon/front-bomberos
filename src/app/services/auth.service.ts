import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../app/app.configuracion';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Data } from '../models/Data';
import { User } from '../models/users';
import { Session } from '../models/sessions';


export interface UserInterface {
  _id: any;
  password: string;
  nom: string;
  ape: string;
  email: string;
  tel: string;
  cel: any;
  direccion: any;
  numero_doc: any;
  estado: any;
  firma: any;
  logotipo: string;
  rol: any;
  message: any;
  // success: any;
  // messages: any;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public http: HttpClient,  private router: Router) {

   }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${Config.URL}usuarios/login/`, {email, password });
  }


  setUser(user: User): void {
    // tslint:disable-next-line:variable-name
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);

  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): User {
    // tslint:disable-next-line:variable-name
    const user_string = localStorage.getItem('currentUser');
    // tslint:disable-next-line: deprecation
    if (!isNullOrUndefined(user_string)) {
      const user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentIp');
    localStorage.removeItem('currentOS');
    localStorage.removeItem('currentBrowser');
    window.location.reload();
  }


  saveSession(session: Session): Observable<Data> {
    return this.http.post<Data>(`${Config.URL}usuarios/session/`, {session});
  }

}
