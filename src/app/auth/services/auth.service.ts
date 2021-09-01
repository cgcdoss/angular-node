import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthService {
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

  refreshToken(): void {
    setInterval(() => {
      this._http.post<{ token: string }>('http://localhost:3333/api/token', {
        refreshToken: sessionStorage.getItem('refreshToken'),
        user: sessionStorage.getItem('usuario')
      }).subscribe(resp => {
        document.cookie = `token=${resp.token}; max-age=${5 * 60}`;
      });
    }, 5 * 60 * 1000); // a cada 5 minutos
  }

  getCookie(cookie: string): string {
    if (document.cookie.indexOf(';') > -1) {
      return document.cookie.substring(document.cookie.indexOf(`${cookie}=`) + cookie.length + 1, document.cookie.indexOf(';'));
    } else {
      return document.cookie.substring(cookie.length + 1);
    }
  }
}
