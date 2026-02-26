import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupSpecialtiesPage } from './signup-specialties.page';

const routes: Routes = [
  {
    path: '',
    component: SignupSpecialtiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupSpecialtiesPageRoutingModule {}
