import { HttpClient } from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";

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
  languages: LanguageItem[] = [{ language: 'English', proficiency: 'Fluent' }];
  private http= inject(HttpClient);
  private authService= inject(AuthService)
  constructor() {}

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

  updateCategory(
    category: string,
    specialties: string[]
  ): Observable<any> {

    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }

    return this.http.put(
      `${this.baseUrl}/register/category`,
      {
        category,
        specialties
      }
      ,{headers:headers}
    );
  }


  updateExperience(experiences: any[]): Observable<any> {

    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.put(
      `${this.baseUrl}/register/experience`,
      { experiences },{headers:headers}
    );
  }
  updateEducation(education: any[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }

    return this.http.put(
      `${this.baseUrl}/register/education`,
      { education }
      ,{headers:headers}
    );
  }

  getCategory(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(`${this.baseUrl}/user/${userId}/category`,{headers:headers});
  }

  getExperience(): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(`${this.baseUrl}/user/experience`,{headers:headers});
  }

  getEducation(): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(`${this.baseUrl}/user/education`,{headers:headers});
  }
}
