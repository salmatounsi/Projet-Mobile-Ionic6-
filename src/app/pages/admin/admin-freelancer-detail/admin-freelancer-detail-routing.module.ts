import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFreelancerDetailPage } from './admin-freelancer-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFreelancerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFreelancerDetailPageRoutingModule {}
