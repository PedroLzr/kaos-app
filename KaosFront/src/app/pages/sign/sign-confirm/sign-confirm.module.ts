import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignConfirmPageRoutingModule } from './sign-confirm-routing.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

import { SignConfirmPage } from './sign-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignConfirmPageRoutingModule,
    NgOtpInputModule,
    SharedComponentsModule
  ],
  declarations: [SignConfirmPage]
})
export class SignConfirmPageModule {}
