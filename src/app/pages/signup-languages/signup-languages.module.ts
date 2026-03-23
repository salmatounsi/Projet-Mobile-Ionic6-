
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupLanguagesPageRoutingModule } from './signup-languages-routing.module';

import { SignupLanguagesPage } from './signup-languages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupLanguagesPageRoutingModule
  ],
  declarations: [SignupLanguagesPage]
})
export class SignupLanguagesPageModule {}
