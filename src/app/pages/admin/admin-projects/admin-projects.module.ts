import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProjectsPageRoutingModule } from './admin-projects-routing.module';

import { AdminProjectsPage } from './admin-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProjectsPageRoutingModule
  ],
  declarations: [AdminProjectsPage]
})
export class AdminProjectsPageModule {}
