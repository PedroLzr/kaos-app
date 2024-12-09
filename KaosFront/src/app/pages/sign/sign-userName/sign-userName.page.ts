import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-UserName-user',
  templateUrl: './sign-UserName.page.html',
  styleUrls: ['./sign-UserName.page.scss'],
})
export class SignUserNamePage implements OnInit {
  user: User = new User();
  invalidForm: boolean = true;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();
  }

  validateInput(event) {
    var input: string = event.detail.value;

    if ('' != input) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }

  goPhone() {
    //AQUI COMPROBAR SI EL NICKNAME ESTA REPETIDO HACIENDO UNA LLAMADA AL SERVIDOR o hacerlo en el login?
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-phone']);
  }
}
