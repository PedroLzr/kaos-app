import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignImageProfilePageRoutingModule } from './sign-imageProfile-routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { SignImageProfilePage } from './sign-imageProfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignImageProfilePageRoutingModule,
    SharedComponentsModule,
    PipesModule,
  ],
  declarations: [SignImageProfilePage],
})
export class SignImageProfilePageModule {}
