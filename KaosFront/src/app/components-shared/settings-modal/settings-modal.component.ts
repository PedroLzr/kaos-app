import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  goSettings() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/settings']);
  }
}
