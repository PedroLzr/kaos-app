import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignGenderPage } from './sign-gender.page';

const routes: Routes = [
  {
    path: '',
    component: SignGenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignGenderPageRoutingModule {}
