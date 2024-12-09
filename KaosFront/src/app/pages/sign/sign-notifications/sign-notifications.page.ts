import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-notifications',
  templateUrl: './sign-notifications.page.html',
  styleUrls: ['./sign-notifications.page.scss'],
})
export class SignNotificationsPage implements OnInit {
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

    this.invalidForm = false;
  }

  goHome(allowNotifications: boolean) {
    if (allowNotifications) {
      console.log('notificaciones activadas');
    } else {
      console.log('notificaciones NO activadas');
    }

    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/tabs']);
  }
}
