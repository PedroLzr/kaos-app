import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {
  userExist: boolean = true;
  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.startAplication();
    }, 2000);
  }

  startAplication() {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/sign-userName']);
    }
  }
}
