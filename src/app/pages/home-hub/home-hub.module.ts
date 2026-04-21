import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeHubPageRoutingModule } from './home-hub-routing.module';

import { HomeHubPage } from './home-hub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeHubPageRoutingModule
  ],
  declarations: [HomeHubPage]
})
export class HomeHubPageModule {}
