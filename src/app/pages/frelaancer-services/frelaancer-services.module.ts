import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrelaancerServicesPageRoutingModule } from './frelaancer-services-routing.module';

import { FrelaancerServicesPage } from './frelaancer-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrelaancerServicesPageRoutingModule
  ],
  declarations: [FrelaancerServicesPage]
})
export class FrelaancerServicesPageModule {}
