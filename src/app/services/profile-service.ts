import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5000';

  fetchProfileData() {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get(`${this.api}/profile`, { headers });
  }

 updateProfile(payload: FormData) {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.put('http://localhost:5000/profile', payload, { headers });
}
}