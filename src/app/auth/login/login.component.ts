import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Session } from '../../models/sessions';
import { DeviceDetectorService } from 'ngx-device-detector';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService, DeviceDetectorService]
})




export class LoginComponent implements OnInit {

    public user;
    public password;
    public form: FormGroup;
    public anio;
    public showPassword: boolean;
    public userIncorrect = true;
    public isError = false;
    public authError;
    public deviceInfo: any;
    public ip: any = '';
    public session: Session;

    constructor(private fb: FormBuilder,
                private messageService: MessageService,
                public authService: AuthService,
                private router: Router,
                private deviceService: DeviceDetectorService,
                private http: HttpClient,
    ) {
        this.epicFunction();
     }

    ngOnInit(): void {
        this.form = this.fb.group({
            user: new FormControl('', Validators.required),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        });
        this.anio = new Date().getFullYear();
        if (this.authService.getToken()) {
            this.router.navigate(['/pages/home']);
        }
    }


    epicFunction() {

        this.http.get<{ip: string}>('https://jsonip.com')
        .subscribe( data => {
          this.ip = data;
        });
        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        const isDesktopDevice = this.deviceService.isDesktop();
      // returns if the app is running on a Desktop browser.
      }


    onLogin() {

        this.authService.login(this.user, this.password).subscribe(
            datos => {

                    if (datos.message === 'login') {
                        console.log(datos.activo);

                        if (datos.activo) {

                        // tslint:disable-next-line:new-parens
                        this.session = new Session;
                        this.session.ip = this.ip.ip;
                        this.session.nom_usu = datos.nombre;
                        this.session.hora_ini = moment(new Date()).format('DD-MM-YYYY');
                        this.session.sistema_operativo = this.deviceInfo.os;
                        this.session.browser = this.deviceInfo.browser;
                        this.session.browser_version = this.deviceInfo.browser_version;
                        this.session.id_usuario = datos._id;
                        this.session.ismovil = this.deviceService.isMobile();
                        this.session.istable = this.deviceService.isTablet();
                        this.session.isbrowser = this.deviceService.isDesktop();

                        this.authService.saveSession(this.session).subscribe(
                            data => {

                                if (data.message === 'Session creada con exito') {

                                    localStorage.setItem('currentIp', this.session.ip);
                                    localStorage.setItem('currentOS', this.session.sistema_operativo);
                                    localStorage.setItem('currentBrowser', this.session.browser);

                                }

                                this.authService.setUser(datos);
                                const token = datos.token;
                                this.authService.setToken(token);
                                this.router.navigate(['/pages/home']);
                                //  location.reload();
                                this.isError = false;

                            });

                        }  else {
                                this.messageService.add({key: 'tc', severity: 'error', summary:
                                'Usuario inactivo', detail: 'Por favor comuniquese con el administrador'});
                        }
                    } else {
                        this.messageService.add({key: 'tc', severity: 'error', summary:
                        'Error Message', detail: 'Usuario o contraseña invalida'});
                    }







            },
            error => this.onIsError()
        );
    }

    onIsError(): void {
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 4000);
    }

    handleKeyDown(event: any) {
        if (event.keyCode === 13) {
            this.onLogin();
        }
    }


    IncorrectUser() {
        // if (this.userIncorrect) {
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error Message', detail: 'Usuario o contraseña invalida' });
        // }
    }


}





