import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageItem } from './signup-data.service';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class OnboardingApiService {
  private baseUrl = 'http://127.0.0.1:5000/api/onboarding';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token ?? ''}`,
      }),
    };
  }

  updateSkills(skills: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/skills`, { skills }, this.headers());
  }

  updateLanguages(languages: LanguageItem[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/languages`, { languages }, this.headers());
  }
}