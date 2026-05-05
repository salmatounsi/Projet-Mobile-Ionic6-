import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-freelancers',
  templateUrl: './admin-freelancers.page.html',
  styleUrls: ['./admin-freelancers.page.scss'],
  standalone: false,
})
export class AdminFreelancersPage implements OnInit {

  freelancers: any[] = [];
  filtered:    any[] = [];
  filter = 'pending';
  loading = true;
  api = 'http://127.0.0.1:5000/api/admin';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit()        { this.load(); }
  ionViewWillEnter(){ this.load(); }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  load() {
    this.loading = true;
    this.http.get<any[]>(`${this.api}/freelancers`, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.freelancers = res || [];
          this.applyFilter();
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
  }

  applyFilter() {
    if (this.filter === 'all') {
      this.filtered = this.freelancers;
    } else if (this.filter === 'pending') {
      this.filtered = this.freelancers.filter(
        f => !f.profile_status || f.profile_status === 'pending'
      );
    } else {
      this.filtered = this.freelancers.filter(
        f => f.profile_status === this.filter
      );
    }
  }

  openDetail(f: any) {
    this.router.navigate(['/admin-freelancer-detail', f.id]);
  }

  initials(first: string, last: string): string {
    return `${(first || '')[0] || ''}${(last || '')[0] || ''}`.toUpperCase();
  }

  statusLabel(s: string): string {
    return ({ pending: 'En attente', approved: 'Validé', rejected: 'Refusé' } as any)[s] || 'En attente';
  }
}