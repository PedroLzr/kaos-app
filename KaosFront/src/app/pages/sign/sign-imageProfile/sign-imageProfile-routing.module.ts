import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignImageProfilePage } from './sign-imageProfile.page';

const routes: Routes = [
  {
    path: '',
    component: SignImageProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignImageProfilePageRoutingModule {}
