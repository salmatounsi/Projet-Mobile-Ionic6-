import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEducationModalComponent } from '../../components/add-education-modal/add-education-modal.component';
import { SignupDataService } from '../../services/signup-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-education',
  templateUrl: './signup-education.page.html',
  styleUrls: ['./signup-education.page.scss'],
  standalone: false,
})
export class SignupEducationPage implements OnInit {
  educations: any[] = [];

  private modalCtrl = inject(ModalController);
  private signupService = inject(SignupDataService);
  private router = inject(Router);

  ngOnInit() {
    this.signupService.getEducation().subscribe({
      next: (res: any) => (this.educations = res.education || []),
      error: (err: any) => console.error(err),
    });
  }

  async openAddEducation() {
    const modal = await this.modalCtrl.create({
      component: AddEducationModalComponent,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) this.educations.push(res.data);
    });

    await modal.present();
  }

  submitEducation() {
    this.signupService.updateEducation(this.educations).subscribe({
      next: () => this.router.navigateByUrl('/signup-skills'),
      error: (err: any) => console.error(err),
    });
  }
}