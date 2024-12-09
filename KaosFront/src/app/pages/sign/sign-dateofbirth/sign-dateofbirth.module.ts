import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignDateOfBirthPageRoutingModule } from './sign-dateofbirth-routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

import { SignDateOfBirthPage } from './sign-dateofbirth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignDateOfBirthPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SignDateOfBirthPage]
})
export class SignDateOfBirthPageModule {}
