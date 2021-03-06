import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _authService: AuthService) {
    const token = this._authService.getCookie('token');
    if (token) {
      _authService.refreshToken(true);
    }
  }

}
