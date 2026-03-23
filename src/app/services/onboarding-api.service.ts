import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageItem } from './signup-data.service';

@Injectable({ providedIn: 'root' })
export class OnboardingApiService {
  private baseUrl = 'http://127.0.0.1:5000/api/onboarding';

  constructor(private http: HttpClient) {}

  updateSkills(userId: string, skills: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/skills`, { skills });
  }

  updateLanguages(userId: string, languages: LanguageItem[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/languages`, { languages });
  }
}