import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('backButton') backButton = '';
  @Input('profile') profile = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SettingsModalComponent,
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25],
    });
    modal.present();
  }
}
