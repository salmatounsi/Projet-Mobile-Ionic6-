import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSkillsPageRoutingModule } from './signup-skills-routing.module';

import { SignupSkillsPage } from './signup-skills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupSkillsPageRoutingModule
  ],
  declarations: [SignupSkillsPage]
})
export class SignupSkillsPageModule {}
