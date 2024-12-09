import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sign-imageProfile',
  templateUrl: './sign-imageProfile.page.html',
  styleUrls: ['./sign-imageProfile.page.scss'],
})
export class SignImageProfilePage implements OnInit {
  user: User = new User();
  invalidForm: boolean = true;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._authService.getObjectSource
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      })
      .unsubscribe();

    this.invalidForm = false;
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Subir Foto de Perfil',
      subHeader:
        'Tu foto de perfil será visible para todos y facilitará que tus amigos te agreguen',
      mode: 'ios',
      cssClass: 'actionSheet-class',
      buttons: [
        {
          text: 'Biblioteca de Fotos',
          handler: () => {
            this.getPictureOfGallery();
          },
        },
        {
          text: 'Cámara',
          handler: () => {
            this.getPicture();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('CANCEL');
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  createUser() {
    this._authService.sendObjectSource(this.user);
    this.router.navigate(['/sign-notifications']);
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    this.user.imageProfile = image.base64String;
  }

  async getPictureOfGallery() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    this.user.imageProfile = image.base64String;
  }
}
