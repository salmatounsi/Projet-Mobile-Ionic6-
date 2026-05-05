import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: false,
})
export class AdminDashboardPage implements OnInit {

  stats: any   = null;
  activeMenu   = 'dashboard';
  api          = 'http://127.0.0.1:5000/api/admin';

  constructor(
    private http:   HttpClient,
    private router: Router,
    private menu:   MenuController
  ) {}

  ngOnInit()        { this.loadStats(); }
  ionViewWillEnter(){ this.loadStats(); }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  loadStats() {
    this.http.get<any>(`${this.api}/stats`, this.getHeaders())
      .subscribe({
        next:  (res) => this.stats = res,
        error: (err) => console.error(err)
      });
  }

  navigate(path: string, menuKey?: string) {
    this.activeMenu = menuKey || path;
    this.menu.close('admin-menu');
    if (path !== 'dashboard') {
      this.router.navigate([`/${path}`]);
    }
  }

  logout() {
    this.menu.close('admin-menu');
    localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}