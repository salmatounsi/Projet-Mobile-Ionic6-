import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSpecialtiesPageRoutingModule } from './signup-specialties-routing.module';

import { SignupSpecialtiesPage } from './signup-specialties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupSpecialtiesPageRoutingModule
  ],
  declarations: [SignupSpecialtiesPage]
})
export class SignupSpecialtiesPageModule {}
