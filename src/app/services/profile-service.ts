import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http= inject(HttpClient);
  private authService = inject(AuthService);
  api = 'http://localhost:5000';

  fetchProfileData():Observable<Object>{
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(`${this.api}/profile`, { headers });
  }
}
