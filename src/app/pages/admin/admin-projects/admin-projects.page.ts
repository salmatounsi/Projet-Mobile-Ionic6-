import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.page.html',
  styleUrls: ['./admin-projects.page.scss'],
  standalone: false,
})
export class AdminProjectsPage implements OnInit {

  projects: any[] = [];
  loading = true;
  api = 'http://127.0.0.1:5000/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit()         { this.load(); }
  ionViewWillEnter() { this.load(); }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  load() {
    this.loading = true;
    this.http.get<any[]>(`${this.api}/projects`, this.getHeaders())
      .subscribe({
        next:  (res) => { this.projects = res || []; this.loading = false; },
        error: ()    => { this.loading = false; }
      });
  }
}