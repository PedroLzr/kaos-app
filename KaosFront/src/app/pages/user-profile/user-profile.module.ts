import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { SharedComponentsModule } from 'src/app/components-shared/shared-components.module';

import { UserProfilePage } from './user-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
