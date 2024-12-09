import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignPhonePage } from './sign-phone.page';

const routes: Routes = [
  {
    path: '',
    component: SignPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPhonePageRoutingModule {}
