import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioCvPage } from './bio-cv.page';

const routes: Routes = [
  {
    path: '',
    component: BioCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioCvPageRoutingModule {}
