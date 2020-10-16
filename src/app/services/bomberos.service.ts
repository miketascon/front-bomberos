import { Router } from '@angular/router';
import { Bomberos } from '../models/bomberos';
import { Data } from '../models/Data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Incidentes } from '../models/incidentes';
import { AuthService } from './auth.service';



@Injectable()
export class BomberosService {
    value: Date;
    token: string;
    headers: any;
    constructor(
        // tslint:disable-next-line:variable-name
        private _http: HttpClient,
        public auth: AuthService
    ) {
       this.token =  this.auth.getToken();
       this.headers = new HttpHeaders().set('token', this.token);
    }

    create(incidentes): Observable<Data> {
        const httpOptions = {
            headers: this.headers
        };
        return this._http.post<Data>(`${Config.URL}bomberos/save/`, { incidentes }, httpOptions);
    }

    find(): Observable<Incidentes> {
        const httpOptions = {
            headers: this.headers
        };
        return this._http.get<Incidentes>(`${Config.URL}bomberos/find/`, httpOptions);
    }

    updateBomberos(id, incidentes): Observable<Data> {
        const httpOptions = {
            headers: this.headers
        };
        return this._http.put<Data>(`${Config.URL}bomberos/update/` + id, { incidentes }, httpOptions);
    }

    findCasoByID(id): Observable<Incidentes> {
        const httpOptions = {
            headers: this.headers
        };
       //
        return this._http.post<Incidentes>(`${Config.URL}bomberos/findCasoByID/`, {id}, httpOptions);
    }

    deleteBomberos(id): Observable<Data> {
        const httpOptions = {
            headers: this.headers
        };
       // let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete<Data>(`${Config.URL}bomberos/delete/` + id, httpOptions );
    }

}
