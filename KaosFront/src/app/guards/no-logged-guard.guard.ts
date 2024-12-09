import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoLoggedGuard implements CanLoad {
  constructor(private _authService: AuthService, private router: Router) {}

  canLoad():
    | Observable<boolean>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isLogged = this._authService.isLogged();
    if (isLogged) {
      this.router.navigate(['/tabs']);
    }

    return !isLogged;
  }
}
