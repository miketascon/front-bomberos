import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService]
})




export class LoginComponent implements OnInit {

    user;
    password;
    form: FormGroup;
    anio;
    showPassword: boolean;
    userIncorrect = true;
    public isError = false;
    public authError;

    constructor(private fb: FormBuilder,
                private messageService: MessageService,
                public authService: AuthService,
                private router: Router
    ) { }

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


    onLogin() {


        this.authService.login(this.user, this.password).subscribe(
            datos => {

                console.log(datos);

                if (datos.estado === 'activo') {
                    // this.userIncorrect = !this.userIncorrect;
                    // tslint:disable-next-line:new-parens
                    this.authService.setUser(datos);
                    const token = datos._id;
                    this.authService.setToken(token);
                    this.router.navigate(['/pages/home']);
                    // location.reload();
                    this.isError = false;



                } else if (datos[0].message === 'correo electrónico o contraseña incorrecta') {
                    this.IncorrectUser();
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error Message', detail: 'El usuario esta incativo por favor comuniquese con el Administrador' });

                }

            },
            error => this.onIsError()
        );
        // if (!this.authService.getToken()) {
        //   this.showError();
        // }
        // setTimeout( () => {
        // }, 2000);
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





