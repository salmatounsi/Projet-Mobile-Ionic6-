import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupLanguagesPage } from './signup-languages.page';

const routes: Routes = [
  {
    path: '',
    component: SignupLanguagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupLanguagesPageRoutingModule {}
