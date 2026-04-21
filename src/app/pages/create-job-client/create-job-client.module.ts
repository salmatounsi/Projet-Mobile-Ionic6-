import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJobClientPageRoutingModule } from './create-job-client-routing.module';

import { CreateJobClientPage } from './create-job-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobClientPageRoutingModule
  ],
  declarations: [CreateJobClientPage]
})
export class CreateJobClientPageModule {}
