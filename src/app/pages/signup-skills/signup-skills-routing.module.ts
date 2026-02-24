import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupSkillsPage } from './signup-skills.page';

const routes: Routes = [
  {
    path: '',
    component: SignupSkillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupSkillsPageRoutingModule {}
