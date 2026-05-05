import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFreelancersPageRoutingModule } from './admin-freelancers-routing.module';

import { AdminFreelancersPage } from './admin-freelancers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminFreelancersPageRoutingModule
  ],
  declarations: [AdminFreelancersPage]
})
export class AdminFreelancersPageModule {}
