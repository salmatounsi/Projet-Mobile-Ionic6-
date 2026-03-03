import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatDydPage } from './what-dyd.page';

const routes: Routes = [
  {
    path: '',
    component: WhatDydPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatDydPageRoutingModule {}
