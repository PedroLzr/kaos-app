import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-sign-gender',
  templateUrl: './sign-gender.page.html',
  styleUrls: ['./sign-gender.page.scss'],
})
export class SignGenderPage implements OnInit {
  user: User = new User();
  invalidForm: boolean = true;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      cssClass: 'actionSheet-class',
      buttons: [
        {
          text: 'Hombre',
          handler: () => {
            this.user.gender = 'Hombre';
          },
        },
        {
          text: 'Mujer',
          handler: () => {
            this.user.gender = 'Mujer';
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  selectSex(event) {
    this.user.gender = event.detail.value;
    this.invalidForm = false;
  }

  goDateofbirth() {
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-dateofbirth']);
  }
}
