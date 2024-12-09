import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignNamePageRoutingModule } from './sign-name-routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

import { SignNamePage } from './sign-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignNamePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SignNamePage]
})
export class SignNamePageModule {}
