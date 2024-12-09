import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export const NO_JW_TOKEN = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class SignInterceptorService implements HttpInterceptor {
  constructor(private storage: Storage) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Si hay token se añade al header para todas las peticiones
    const token = localStorage.getItem('token');

    //Omitimos el interceptor para las peticiones que no necesitan el token y cuando el token no exista
    if (!token || req.context.get(NO_JW_TOKEN) === true) {
      return next.handle(req);
    }

    console.log(token);
    const headers = req.clone({
      headers: req.headers.set('auth-x-token', token),
    });

    return next.handle(headers);
  }
}
