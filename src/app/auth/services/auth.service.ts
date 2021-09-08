import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthService {

  refreshToken$: Subject<{ refreshToken: string, user: string }> = new Subject();

  constructor(private _http: HttpClient) { }

  login(user: string, password: string): Observable<{ token: string; auth: boolean; refreshToken: string }> {
    return this._http.post<{ token: string, auth: boolean, refreshToken: string }>('http://localhost:3333/api/login', {
      user,
      password
    });
  }

  logout(): Observable<any> {
    return this._http.post('http://localhost:3333/api/logout', { user: sessionStorage.getItem('usuario') })
      .pipe(
        tap(() => {
          document.cookie = 'token=; Max-Age=-1';
          sessionStorage.clear();
        })
      );
  }

  refreshToken(isGetNewTokenNow?: boolean): void {
    let interval = setInterval(() => {
      if (sessionStorage.getItem('refreshToken') && sessionStorage.getItem('usuario')) {
        this.refreshToken$.next({
          refreshToken: sessionStorage.getItem('refreshToken') as string,
          user: sessionStorage.getItem('usuario') as string
        });
      } else {
        this.refreshToken$.complete();
        clearInterval(interval);
      }
    }, 5 * 60 * 1000); // a cada 5 minutos


    this.refreshToken$.subscribe(token => {
      this._http.post<{ token: string }>('http://localhost:3333/api/token', {
        refreshToken: token.refreshToken,
        user: token.user
      }).subscribe(resp => {
        document.cookie = `token=${resp.token}; max-age=${5 * 60}`;
      });
    });

    // Para pegar um novo token de imediato (usado quando o usuário der F5 no site, por exemplo)
    if (isGetNewTokenNow && sessionStorage.getItem('refreshToken') && sessionStorage.getItem('usuario')) {
      this.refreshToken$.next({
        refreshToken: sessionStorage.getItem('refreshToken') as string,
        user: sessionStorage.getItem('usuario') as string
      });
    }
  }

  getCookie(cookie: string): string {
    if (document.cookie.indexOf(';') > -1) {
      return document.cookie.substring(document.cookie.indexOf(`${cookie}=`) + cookie.length + 1, document.cookie.indexOf(';'));
    } else {
      return document.cookie.substring(cookie.length + 1);
    }
  }
}
