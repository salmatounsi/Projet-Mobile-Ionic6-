import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminJobsPageRoutingModule } from './admin-jobs-routing.module';

import { AdminJobsPage } from './admin-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminJobsPageRoutingModule
  ],
  declarations: [AdminJobsPage]
})
export class AdminJobsPageModule {}
