import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proficiency, SignupDataService } from '../../services/signup-data.service';

@Component({
  selector: 'app-signup-languages',
  templateUrl: './signup-languages.page.html',
  styleUrls: ['./signup-languages.page.scss'],
  standalone: false,
})
export class SignupLanguagesPage {
  allLanguages = ['English', 'French', 'Arabic', 'German', 'Spanish', 'Italian'];
  proficiencies: Proficiency[] = ['Basic', 'Conversational', 'Fluent', 'Native/Bilingual'];

  constructor(public signup: SignupDataService, private router: Router) {}

  addRow() {
    this.signup.languages.push({ language: '', proficiency: 'Fluent' });
  }

  back() {
    this.router.navigateByUrl('/signup-skills');
  }

  next() {
    // later: overview page
    this.router.navigateByUrl('/home');
  }
}