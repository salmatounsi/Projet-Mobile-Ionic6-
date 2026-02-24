import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDataService } from '../../services/signup-data.service';

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

  constructor(public signup: SignupDataService, private router: Router) {}

  addFromInput() {
    this.signup.addSkill(this.skillInput);
    this.skillInput = '';
  }

  toggleSuggested(skill: string) {
    if (this.signup.skills.includes(skill)) this.signup.removeSkill(skill);
    else this.signup.addSkill(skill);
  }

  next() {
    this.router.navigateByUrl('/signup-languages');
  }
}