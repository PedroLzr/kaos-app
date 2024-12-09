import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignPhonePageRoutingModule } from './sign-phone-routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { SignPhonePage } from './sign-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignPhonePageRoutingModule,
    SharedComponentsModule,
    PipesModule
  ],
  declarations: [SignPhonePage]
})
export class SignPhonePageModule {}
