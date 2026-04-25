import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

export type Proficiency = 'Basic' | 'Conversational' | 'Fluent' | 'Native/Bilingual';

export interface LanguageItem {
  language: string;
  proficiency: Proficiency;
}

@Injectable({ providedIn: 'root' })
export class SignupDataService {
  private baseUrl = 'http://localhost:5000/auth';

  userId: string | null = null;
  skills: string[] = [];
  languages: LanguageItem[] = [
    { language: 'English', proficiency: 'Fluent' }
  ];

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {}

  private getHeaders() {
    const token = this.authService.getToken() || localStorage.getItem('token');

    return {
      Authorization: `Bearer ${token}`
    };
  }

  addSkill(skill: string) {
    const s = skill.trim();

    if (!s) {
      return;
    }

    if (!this.skills.includes(s)) {
      this.skills.push(s);
    }
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(x => x !== skill);
  }

  removeLanguage(index: number) {
    this.languages.splice(index, 1);
  }

  updateLanguage(index: number, patch: Partial<LanguageItem>) {
    this.languages[index] = {
      ...this.languages[index],
      ...patch
    };
  }

  updateCategory(category: any, specialties: string[]): Observable<any> {
    const payload = {
      category,
      specialties
    };

    return this.http.put(
      `${this.baseUrl}/register/category`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  updateExperience(experiences: any[]): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/register/experience`,
      { experiences },
      { headers: this.getHeaders() }
    );
  }

  updateEducation(education: any[]): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/register/education`,
      { education },
      { headers: this.getHeaders() }
    );
  }

  getCategory(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/user/category`,
      { headers: this.getHeaders() }
    );
  }

  getExperience(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/user/experience`,
      { headers: this.getHeaders() }
    );
  }

  getEducation(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/user/education`,
      { headers: this.getHeaders() }
    );
  }
}