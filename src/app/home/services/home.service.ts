import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

  getClientes(): Observable<any> {
    return this._http.get('http://localhost:3333/api/clientes');
  }

}
