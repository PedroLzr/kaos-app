import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanLoad {
  constructor(private _authService: AuthService, private router: Router) {}
  canLoad():
    | Observable<boolean>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isLogged = this._authService.isLogged();
    if (!isLogged) {
      console.log('pasa por aqui');
      this.router.navigate(['/sign-userName']);
    }

    return isLogged;
  }
}
