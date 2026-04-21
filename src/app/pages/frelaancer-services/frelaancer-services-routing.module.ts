import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrelaancerServicesPage } from './frelaancer-services.page';

const routes: Routes = [
  {
    path: '',
    component: FrelaancerServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrelaancerServicesPageRoutingModule {}
