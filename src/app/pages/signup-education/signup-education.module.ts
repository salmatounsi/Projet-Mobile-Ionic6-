import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupEducationPageRoutingModule } from './signup-education-routing.module';

import { SignupEducationPage } from './signup-education.page';
import {AddEducationModalComponent} from "../../components/add-education-modal/add-education-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupEducationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SignupEducationPage,AddEducationModalComponent]
})
export class SignupEducationPageModule {}
