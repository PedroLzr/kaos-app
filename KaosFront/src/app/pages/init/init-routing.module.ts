import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitPage } from './init.page';

const routes: Routes = [
  {
    path: '',
    component: InitPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitPageRoutingModule {}
