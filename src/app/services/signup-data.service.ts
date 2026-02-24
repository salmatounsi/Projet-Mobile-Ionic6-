import { Injectable } from '@angular/core';

export type Proficiency = 'Basic' | 'Conversational' | 'Fluent' | 'Native/Bilingual';

export interface LanguageItem {
  language: string;
  proficiency: Proficiency;
}

@Injectable({ providedIn: 'root' })
export class SignupDataService {
  skills: string[] = [];
  languages: LanguageItem[] = [{ language: 'English', proficiency: 'Fluent' }];

  addSkill(skill: string) {
    const s = skill.trim();
    if (!s) return;
    if (!this.skills.includes(s)) this.skills.push(s);
  }
  removeSkill(skill: string) {
    this.skills = this.skills.filter(x => x !== skill);
  }
  removeLanguage(index: number) {
    this.languages.splice(index, 1);
  }
  updateLanguage(index: number, patch: Partial<LanguageItem>) {
    this.languages[index] = { ...this.languages[index], ...patch };
  }
}