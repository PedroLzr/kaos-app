import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlphabeteScrollComponent } from './alphabete-scroll/alphabete-scroll.component';
import { HeaderComponent } from './header/header.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    AlphabeteScrollComponent,
    HeaderComponent,
    SettingsModalComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [AlphabeteScrollComponent, HeaderComponent, SettingsModalComponent],
})
export class SharedComponentsModule {}
