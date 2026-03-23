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

  // TEMP: remplacer plus tard par le vrai userId après signup/login
  private userId = '69a74a3a0b84371d1323a85b';

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
    // validation simple
    const valid = this.signup.languages.every(l => l.language && l.proficiency);
    if (!valid) {
      alert('Please select a language and proficiency for each row.');
      return;
    }

    this.api.updateLanguages(this.userId, this.signup.languages).subscribe({
      next: () => this.router.navigateByUrl('/home'), // ou ta page suivante
      error: (err) => {
        console.error('updateLanguages failed', err);
        alert('Failed to save languages. Is the backend running?');
      },
    });
  }
}
