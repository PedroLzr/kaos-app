import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-sign-dateofbirth',
  templateUrl: './sign-dateofbirth.page.html',
  styleUrls: ['./sign-dateofbirth.page.scss'],
})
export class SignDateOfBirthPage implements OnInit {
  user: User = new User();
  invalidForm: boolean = true;
  lastInputCount: number = 0;
  patternDate = /^([0-2][0-9]|3[0-1])\s(0[1-9]|1[0-2])\s((1[9]|2[0-9])\d{2})$/;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();
  }

  // selectDate(date){
  //   var formattedDate = format(parseISO(date), 'dd MM yyyy');
  //   this.user.birthDate = formattedDate;
  //   this.invalidForm = false;
  // }

  inputDateChange(event) {
    var date: string = event.detail.value;
    this.invalidForm = true;

    //Añade y quita espacios para que se muestre en input DD MM YYYY
    if (
      (date.length == 2 || date.length == 5) &&
      date.length > this.lastInputCount
    ) {
      date = date + ' ';
    } else if (
      (date.length == 3 || date.length == 6) &&
      date.length < this.lastInputCount
    ) {
      date = date.trimEnd();
    } else if (
      (date.length == 3 || date.length == 6) &&
      date.length > this.lastInputCount
    ) {
      let lastLetter = date.charAt(date.length - 1);
      date = date.substring(0, date.length - 1);
      date = date + ' ' + lastLetter;
    }

    //Comprobamos que es una fecha correcta con formato DD MM YYYY
    if (this.patternDate.test(date)) {
      this.invalidForm = false;
    }

    this.user.dateofbirth = date;
    this.lastInputCount = date.length;
  }

  goImageProfile() {
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-imageProfile']);
  }
}
