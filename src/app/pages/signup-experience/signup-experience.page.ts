import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AddExperienceModalComponent} from "../../components/add-experience-modal/add-experience-modal.component";
import { inject } from '@angular/core';

@Component({
  selector: 'app-signup-experience',
  templateUrl: './signup-experience.page.html',
  styleUrls: ['./signup-experience.page.scss'],
  standalone: false,
})
export class SignupExperiencePage implements OnInit {

  experiences: any[] = [];
  private modalCtrl= inject(ModalController);
  constructor() {}

  async openAddExperience() {
    const modal = await this.modalCtrl.create({
      component: AddExperienceModalComponent,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.experiences.push(res.data);
      }
    });

    await modal.present();
  }
  ngOnInit() {
  }

}
