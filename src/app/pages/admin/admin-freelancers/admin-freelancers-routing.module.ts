import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFreelancersPage } from './admin-freelancers.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFreelancersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFreelancersPageRoutingModule {}
