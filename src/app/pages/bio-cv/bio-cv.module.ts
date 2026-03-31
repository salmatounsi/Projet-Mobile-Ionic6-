import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioCvPageRoutingModule } from './bio-cv-routing.module';

import { BioCvPage } from './bio-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioCvPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BioCvPage]
})
export class BioCvPageModule {

  
  
}
