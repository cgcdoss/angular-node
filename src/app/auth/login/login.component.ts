import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });
  isLogado = false;

  constructor(private _service: AuthService, private fb: FormBuilder, private _router: Router) { }

  login(): void {
    if (!this.loginForm.valid)
      return;

    this._service.login(this.loginForm.controls.usuario.value, this.loginForm.controls.senha.value)
      .subscribe({
        next: (resp) => {
          document.cookie = `token=${resp.token}; max-age=${5 * 60}`;
          sessionStorage.setItem('refreshToken', resp.refreshToken);
          sessionStorage.setItem('usuario', this.loginForm.controls.usuario.value);
          this._service.refreshToken();
          this._router.navigateByUrl('/home');
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

}
