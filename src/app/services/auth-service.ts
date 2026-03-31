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
}
