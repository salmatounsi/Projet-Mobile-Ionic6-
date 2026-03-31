import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDataService } from '../../services/signup-data.service';
import { OnboardingApiService } from '../../services/onboarding-api.service';

@Component({
  selector: 'app-signup-skills',
  templateUrl: './signup-skills.page.html',
  styleUrls: ['./signup-skills.page.scss'],
  standalone: false,
})
export class SignupSkillsPage {
  skillInput = '';

  suggestedSkills = [
    'Mobile Development',
    'UI/UX Design',
    'Web Development',
    'Backend Development',
    'Database',
    'Computer Network',
    'System Administration',
    'Digital Marketing',
    'AI',
  ];

  // TEMP: remplacer plus tard par le vrai userId après signup/login
  // private userId = '69a74a3a0b84371d1323a85b';

  get userId(): string | null {
    return this.signup.userId;
  }

  constructor(
    public signup: SignupDataService,
    private router: Router,
    private api: OnboardingApiService
  ) {}

  addFromInput() {
    this.signup.addSkill(this.skillInput);
    this.skillInput = '';
  }

  toggleSuggested(skill: string) {
    if (this.signup.skills.includes(skill)) this.signup.removeSkill(skill);
    else this.signup.addSkill(skill);
  }

  next() {
    if (this.signup.skills.length === 0) {
      alert('Please add at least one skill.');
      return;
    }

    if (!this.userId) {
      alert('User ID not available. Please complete previous steps.');
      return;
    }

    this.api.updateSkills(this.userId, this.signup.skills).subscribe({
      next: () => this.router.navigateByUrl('/signup-languages'),
      error: (err) => {
        console.error('updateSkills failed', err);
        alert('Failed to save skills. Is the backend running?');
      },
    });
  }
}
