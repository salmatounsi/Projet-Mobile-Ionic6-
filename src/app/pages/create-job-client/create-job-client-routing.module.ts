import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateJobClientPage } from './create-job-client.page';

const routes: Routes = [
  {
    path: '',
    component: CreateJobClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateJobClientPageRoutingModule {}
