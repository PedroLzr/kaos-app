import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignNotificationsPageRoutingModule } from './sign-notifications-routing.module';
import { SharedComponentsModule } from '../../../components-shared/shared-components.module';

import { SignNotificationsPage } from './sign-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignNotificationsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SignNotificationsPage]
})
export class SignNotificationsPageModule {}
