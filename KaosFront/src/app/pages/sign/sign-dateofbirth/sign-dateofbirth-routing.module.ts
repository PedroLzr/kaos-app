import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignDateOfBirthPage } from './sign-dateofbirth.page';

const routes: Routes = [
  {
    path: '',
    component: SignDateOfBirthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignDateOfBirthPageRoutingModule {}
