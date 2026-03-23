import {Component, inject, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {AddExperienceModalComponent} from "../../components/add-experience-modal/add-experience-modal.component";
import {AddEducationModalComponent} from "../../components/add-education-modal/add-education-modal.component";
import {SignupDataService} from "../../services/signup-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup-education',
  templateUrl: './signup-education.page.html',
  styleUrls: ['./signup-education.page.scss'],
  standalone: false,
})
export class SignupEducationPage implements OnInit {

  educations: any[] = [];
  private modalCtrl= inject(ModalController);
  private route = inject(ActivatedRoute);

  constructor() {
    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state && nav.extras.state['userId']) {
      this.signupService.userId = nav.extras.state['userId'];
      console.log('Received ID from state:', this.signupService.userId);
    } else {
      if (!this.signupService.userId) {
        console.error('No userId found in router state or service!');
      }
    }
  }

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
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      this.signupService.userId = idFromUrl;
      console.log('Successfully read ID from URL:', this.signupService.userId);
    } else {
      console.error('No ID found in the URL path!');
    }


    if (this.signupService.userId) {
      this.signupService.getEducation(this.signupService.userId).subscribe({
        next: (res) => {
          this.educations = res.education || [];

        }
      });
    }
  }
  private signupService = inject(SignupDataService);
  private navCtrl = inject(NavController);
  private router = inject(Router)
  submitEducation() {
    this.signupService.updateEducation(this.educations).subscribe({
      next: (res) => {
        console.log('Education saved:', res);
        this.navCtrl.navigateForward(`/signup-skills/${this.signupService.userId}`);
        //this.navCtrl.navigateForward('/dashboard');
      },
      error: (err) => console.error('Error saving education:', err)
    });
  }
}
