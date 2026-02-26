import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupExperiencePage } from './signup-experience.page';

const routes: Routes = [
  {
    path: '',
    component: SignupExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupExperiencePageRoutingModule {}
