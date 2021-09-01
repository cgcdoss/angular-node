import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { retry, tap, timeout } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientes!: any[];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this._homeService.getClientes()
      .pipe(
        tap(() => console.log('carregando clientes')),
        timeout(4000), // espera até 4s pra ter resposta
        retry(3), // tenta 3 vezes, se a primeira der falha
      )
      .subscribe((res: any) => {
        this.clientes = res;
      }, err => {
        console.log('falha ao recuperar clientes', err.error);
      });
  }

  logout(): void {
    this._authService.logout().subscribe(resp => {
      this._router.navigateByUrl('/login');
    });
  }

}
