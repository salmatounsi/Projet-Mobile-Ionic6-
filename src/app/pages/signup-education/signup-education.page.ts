import {Component, inject, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AddExperienceModalComponent} from "../../components/add-experience-modal/add-experience-modal.component";
import {AddEducationModalComponent} from "../../components/add-education-modal/add-education-modal.component";

@Component({
  selector: 'app-signup-education',
  templateUrl: './signup-education.page.html',
  styleUrls: ['./signup-education.page.scss'],
  standalone: false,
})
export class SignupEducationPage implements OnInit {

  educations: any[] = [];
  private modalCtrl= inject(ModalController);
  constructor() {}

  async openAddEducation() {
    const modal = await this.modalCtrl.create({
      component: AddEducationModalComponent,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.educations.push(res.data);
      }
    });

    await modal.present();
  }

  ngOnInit() {
  }

}
