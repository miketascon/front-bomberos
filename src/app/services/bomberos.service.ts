import { Router } from '@angular/router';
import { Bomberos } from '../models/bomberos';
import { Data } from '../models/Data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.configuracion';
import { Incidentes } from '../models/incidentes';


@Injectable()
export class BomberosService {
    value: Date;
    constructor(
        // tslint:disable-next-line:variable-name
        private _http: HttpClient,

    ) {}

    create(incidentes): Observable<Data> {
        return this._http.post<Data>(`${Config.URL}bomberos/save/`, { incidentes });
    }

    find(): Observable<Incidentes> {
        return this._http.get<Incidentes>(`${Config.URL}bomberos/find/`);
    }

    updateBomberos(id, incidentes): Observable<Data> {
        return this._http.put<Data>(`${Config.URL}bomberos/update/` + id, { incidentes });
    }

    findCasoByID(id): Observable<Incidentes> {
       //
        return this._http.post<Incidentes>(`${Config.URL}bomberos/findCasoByID/`, {id});
    }

    deleteBomberos(id): Observable<Data> {
       // let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete<Data>(`${Config.URL}bomberos/delete/` + id );
    }

}
