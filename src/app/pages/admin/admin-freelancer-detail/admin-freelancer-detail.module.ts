import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFreelancerDetailPageRoutingModule } from './admin-freelancer-detail-routing.module';

import { AdminFreelancerDetailPage } from './admin-freelancer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminFreelancerDetailPageRoutingModule
  ],
  declarations: [AdminFreelancerDetailPage]
})
export class AdminFreelancerDetailPageModule {}
