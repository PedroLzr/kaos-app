import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignNotificationsPage } from './sign-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: SignNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignNotificationsPageRoutingModule {}
