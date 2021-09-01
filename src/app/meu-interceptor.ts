import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';


@Injectable()
export class MeuInterceptor implements HttpInterceptor {

  constructor(private _authSerivce: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authSerivce.getCookie('token');
    if (token) {
      const newReq = req.clone({
        headers: new HttpHeaders({ 'x-access-token': token })
      });
      return next.handle(newReq)
    } else {
      return next.handle(req);
    }
  }

}
