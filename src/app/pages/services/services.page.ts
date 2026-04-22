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
  private api = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  goToCreateService() {
    this.router.navigate(['/create-service']);
  }

  loadServices() {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.http.get<any[]>(`${this.api}/services`, { headers }).subscribe({
      next: (data) => {
        this.services = data;
        console.log(this.services);
      },
      error: (err) => console.error(err)
    });
  }
}