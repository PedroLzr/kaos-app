import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignUserNamePageRoutingModule } from './sign-userName.routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

import { SignUserNamePage } from './sign-userName.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUserNamePageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [SignUserNamePage],
})
export class SignUserNamePageModule {}
