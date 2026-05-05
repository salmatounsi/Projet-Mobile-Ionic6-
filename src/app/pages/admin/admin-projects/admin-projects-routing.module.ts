import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProjectsPage } from './admin-projects.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProjectsPageRoutingModule {}
