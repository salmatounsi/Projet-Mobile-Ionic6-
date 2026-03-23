import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionApiService {
  private baseUrl = 'http://127.0.0.1:5000/api/subscription';

  constructor(private http: HttpClient) {}

  activate(userId: string, agreed: boolean, autoRenew: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/activate`, {
      agreed,
      autoRenew
    });
  }
}