import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailPageRoutingModule } from './event-detail-routing.module';

import { SharedComponentsModule } from 'src/app/components-shared/shared-components.module';

import { EventDetailPage } from './event-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [EventDetailPage],
})
export class EventDetailPageModule {}
