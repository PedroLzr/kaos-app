import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignGenderPageRoutingModule } from './sign-gender-routing.module';

import { SignGenderPage } from './sign-gender.page';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignGenderPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SignGenderPage]
})
export class SignGenderPageModule {

}
