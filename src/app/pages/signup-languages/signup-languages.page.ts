import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proficiency, SignupDataService } from '../../services/signup-data.service';
import { OnboardingApiService } from '../../services/onboarding-api.service';

@Component({
  selector: 'app-signup-languages',
  templateUrl: './signup-languages.page.html',
  styleUrls: ['./signup-languages.page.scss'],
  standalone: false,
})
export class SignupLanguagesPage {
  allLanguages = ['English', 'French', 'Arabic', 'German', 'Spanish', 'Italian'];
  proficiencies: Proficiency[] = ['Basic', 'Conversational', 'Fluent', 'Native/Bilingual'];





  constructor(
    public signup: SignupDataService,
    private router: Router,
    private api: OnboardingApiService
  ) {}

  addRow() {
    this.signup.languages.push({ language: '', proficiency: 'Fluent' });
  }

  back() {
    this.router.navigateByUrl('/bio-cv');
  }

  next() {

    const valid = this.signup.languages.every(l => l.language && l.proficiency);
    if (!valid) {
      alert('Please select a language and proficiency for each row.');
      return;
    }



    this.api.updateLanguages( this.signup.languages).subscribe({
      next: () => this.router.navigateByUrl('signup-skills'),
      error: (err) => {
        console.error('updateLanguages failed', err);
        alert('Failed to save languages. Is the backend running?');
      },
    });
  }
}
