import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupExperiencePageRoutingModule } from './signup-experience-routing.module';

import { SignupExperiencePage } from './signup-experience.page';
import {AddExperienceModalComponent} from "../../components/add-experience-modal/add-experience-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupExperiencePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SignupExperiencePage,AddExperienceModalComponent]
})
export class SignupExperiencePageModule {}
