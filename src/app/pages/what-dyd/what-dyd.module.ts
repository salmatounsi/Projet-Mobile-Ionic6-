import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatDydPageRoutingModule } from './what-dyd-routing.module';

import { WhatDydPage } from './what-dyd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatDydPageRoutingModule
  ],
  declarations: [WhatDydPage]
})
export class WhatDydPageModule {}
