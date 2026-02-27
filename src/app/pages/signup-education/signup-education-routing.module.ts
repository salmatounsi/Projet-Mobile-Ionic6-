import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupEducationPage } from './signup-education.page';

const routes: Routes = [
  {
    path: '',
    component: SignupEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupEducationPageRoutingModule {}
