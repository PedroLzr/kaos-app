import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventHomeComponent } from './event-home/event-home.component';

@NgModule({
  declarations: [EventHomeComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [EventHomeComponent],
})
export class ComponentsModule {}
