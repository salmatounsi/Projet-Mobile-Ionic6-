import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'http://localhost:5000';

  constructor() {}
  private http= inject(HttpClient);
  getToken(){
    return localStorage.getItem('token');
  }
  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload._id || payload.id;
    } catch (e) {
      return null;
    }
  }

  setToken(token: any) {
    localStorage.setItem("token",token);
  }

  getPayload(): any | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

getRole(): 'client' | 'freelancer' | 'admin' | null {
  const payload = this.getPayload();
  return payload?.role ?? null;
}
}
