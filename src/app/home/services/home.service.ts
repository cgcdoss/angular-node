import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

  getClientes(setTimeout?: number): Observable<Pessoa[]> {
    return this._http.get<Pessoa[]>(`${environment.urlApi}clientes`, {
      params: { timeout: setTimeout || 0 }
    });
  }

  getFuncis(): Observable<Pessoa[]> {
    return this._http.get<Pessoa[]>(`${environment.urlApi}funcionarios`)
      .pipe(tap((resp) => console.log('Pipe: ', resp)));
  }

}

export interface Pessoa {
  nome: string;
}