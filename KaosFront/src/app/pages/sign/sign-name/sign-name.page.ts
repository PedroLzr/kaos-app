import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sign-name',
  templateUrl: './sign-name.page.html',
  styleUrls: ['./sign-name.page.scss'],
})
export class SignNamePage implements OnInit {
  user: User = new User();
  invalidForm: boolean = true;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {}

  validateInput(event) {
    var input: string = event.detail.value;

    if ('' != input) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }

  goGender() {
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-gender']);
  }
}
