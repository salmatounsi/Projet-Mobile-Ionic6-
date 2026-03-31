import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInfoPageRoutingModule } from './general-info-routing.module';

import { GeneralInfoPage } from './general-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GeneralInfoPage]
})
export class GeneralInfoPageModule {}
