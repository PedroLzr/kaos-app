import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignConfirmPage } from './sign-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: SignConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignConfirmPageRoutingModule {}
