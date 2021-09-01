import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _authService: AuthService) { }

  canActivate() {
    const token = this._authService.getCookie('token');
    if (!token) {
      this._router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}