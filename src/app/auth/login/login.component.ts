import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCALSTORAGE, MYCUSTOMLOCALSTORAGE, MyStorage, SESSIONSTORAGE } from '../../services/storage-service-token';
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

  constructor(
    private _service: AuthService,
    private fb: FormBuilder,
    private _router: Router,
    @Inject(LOCALSTORAGE) private localStorage: MyStorage,
    @Inject(SESSIONSTORAGE) private sessionStorage: Storage,
    @Inject(MYCUSTOMLOCALSTORAGE) private customLocalStorage: MyStorage,) { }

  login(): void {
    if (!this.loginForm.valid) {
      this.localStorage.setItem('loginfalhou', 'true');
      this.sessionStorage.setItem('loginfalhou', 'true');
      this.customLocalStorage.setItem('loginfalhou', 'true');
      this.shakeInput();
      return;
    }

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

  private shakeInput(): void {
    document.getElementsByTagName('input').namedItem('login1')?.classList.add('shake');
    document.getElementsByTagName('input').namedItem('senha1')?.classList.add('shake');
    setTimeout(() => {
      document.getElementsByTagName('input').namedItem('login1')?.classList.remove('shake');
      document.getElementsByTagName('input').namedItem('senha1')?.classList.remove('shake');
    }, 200);
  }

  testeDiretiva(event: any): void {
    console.debug(event);
  }

}
