import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { NO_JW_TOKEN } from '../interceptors/sign-interceptor.service';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const url = environment.url;
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private objectSource = new BehaviorSubject<User>(new User());
  getObjectSource = this.objectSource.asObservable();
  userToken: string = null;

  constructor(private http: HttpClient, private navCtrl: NavController) {
    //Para comprobar si el token es valido cada vez que se ejecute el servicio
    //this.checkToken();
  }

  /**
   * Héctor Cespedes Rodrigo
   * Sirve para pasar objetos entre páginas
   */
  sendObjectSource(data: any) {
    this.objectSource.next(data);
  }

  isLogged(): boolean {
    if (null == localStorage.getItem('loggedIn')) {
      localStorage.setItem('loggedIn', 'false');
    }
    return localStorage.getItem('loggedIn') === 'true';
  }

  login(userName: string, phone: string): Observable<any> {
    const data = {
      userName,
      phone,
    };

    return this.http
      .post(`${url}api/auth/login`, data, {
        context: new HttpContext().set(NO_JW_TOKEN, true),
      })
      .pipe(
        map((resp) => {
          this.saveToken(resp['token']);
          this.saveUser(resp['user']);
          localStorage.setItem('loggedIn', 'true');
          this.sendObjectSource(resp);
          return resp;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logOut(): void {
    //borrar datos del storage
    localStorage.clear();
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  handleError(err): Observable<never> {
    let errorMessage = 'An error ocurred';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
