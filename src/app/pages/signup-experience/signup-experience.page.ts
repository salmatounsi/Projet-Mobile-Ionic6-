import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {AddExperienceModalComponent} from "../../components/add-experience-modal/add-experience-modal.component";
import { inject } from '@angular/core';
import {SignupDataService} from "../../services/signup-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup-experience',
  templateUrl: './signup-experience.page.html',
  styleUrls: ['./signup-experience.page.scss'],
  standalone: false,
})
export class SignupExperiencePage implements OnInit {

  experiences: any[] = [];
  private modalCtrl= inject(ModalController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor() {

  }

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
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      this.signupService.userId = idFromUrl;
      console.log('Successfully read ID from URL:', this.signupService.userId);
    } else {
      console.error('No ID found in the URL path!');
    }

    if (this.signupService.userId) {
      this.signupService.getExperience(this.signupService.userId).subscribe({
        next: (res) => {
          this.experiences = res.experience || [];
        }
      });
    }
    /* const nav = this.router.getCurrentNavigation();
   if (nav?.extras?.state && nav.extras.state['userId']) {
     this.api.userId = nav.extras.state['userId'];*/
   // this.signupService.userId = "69a74a3a0b84371d1323a85b";
    /* } else {
       console.error('No userId found in router state!');
     }*/
  }
  private signupService = inject(SignupDataService);
  private navCtrl = inject(NavController);
  submitExperience() {
    this.signupService.updateExperience(this.experiences).subscribe({
      next: (res) => {
        console.log('Success!', res);
        this.navCtrl.navigateForward(`/signup-education/${this.signupService.userId}`);      },
      error: (err) => {
        console.error('Database update failed:', err);
      }
    });
  }
}
