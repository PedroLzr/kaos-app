import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignNamePage } from './sign-name.page';

const routes: Routes = [
  {
    path: '',
    component: SignNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignNamePageRoutingModule {}
