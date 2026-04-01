import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageItem } from './signup-data.service';
import {AuthService} from "./auth-service";

@Injectable({ providedIn: 'root' })
export class OnboardingApiService {
  private baseUrl = 'http://127.0.0.1:5000/api/onboarding';

  constructor(private http: HttpClient, private authService:AuthService) {}

  updateSkills( skills: string[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.put(`${this.baseUrl}/skills`, { skills },{headers:headers});
  }

  updateLanguages(languages: LanguageItem[]): Observable<any>{
  const token = this.authService.getToken();
  const headers = {
    'Authorization': `Bearer ${token}`
  }
    return this.http.put(`${this.baseUrl}/languages`, { languages },{headers:headers});
  }
}
