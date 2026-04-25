import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  standalone: false,
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: any[] = [];
  role: string = '';
  selectedView: 'all' | 'mine' = 'all';

  private api = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();

    if (this.role === 'freelancer') {
      this.selectedView = 'mine';
    } else {
      this.selectedView = 'all';
    }

    this.loadServices();
  }

  ionViewWillEnter() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();
    this.loadServices();
  }

  switchView(view: any) {
  if (view !== 'all' && view !== 'mine') {
    return;
  }

  this.selectedView = view;
  this.loadServices();
}

  loadServices() {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };

    let url = `${this.api}/services`;

    if (this.role === 'freelancer' && this.selectedView === 'mine') {
      url = `${this.api}/services/my`;
    }

    this.http.get<any[]>(url, { headers }).subscribe({
      next: (data) => {
        this.services = data;
        console.log('Services:', this.services);
      },
      error: (err) => console.error(err),
    });
  }

  goToCreateService() {
    this.router.navigate(['/create-service']);
  }
}