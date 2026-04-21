import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeHubPage } from './home-hub.page';

const routes: Routes = [
  {
    path: '',
    component: HomeHubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeHubPageRoutingModule {}
