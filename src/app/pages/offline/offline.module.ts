import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflinePageRoutingModule } from './offline-routing.module';

import { OfflinePage } from './offline.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflinePageRoutingModule,
    ComponentsModule
  ],
  declarations: [OfflinePage]
})
export class OfflinePageModule {}
