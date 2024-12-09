import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-confirm',
  templateUrl: './sign-confirm.page.html',
  styleUrls: ['./sign-confirm.page.scss'],
})
export class SignConfirmPage implements OnInit {
  user: User = new User();
  invalidForm: boolean = false;
  confirmCode: string = '';
  seconds: number = 45;
  intervalId: null | ReturnType<typeof setTimeout> = null;

  config = {
    length: 6,
    allowNumbersOnly: true,
  };

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();

    /* Contador para reenviar el mensaje */
    this.intervalId = setInterval(() => this.timer(), 1000);
  }

  timer() {
    if (--this.seconds < 0) {
      this.seconds = 45;
    }
  }

  onOtpChange(event) {
    this.confirmCode = event;
    if (this.confirmCode.length == 6) {
      console.log('Enviar codigo al backend!!');
    }
  }

  goFullName() {
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-fullName']);
  }
}
