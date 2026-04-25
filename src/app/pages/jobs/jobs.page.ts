import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];

  searchTerm: string = '';
  role: string = '';
  selectedView: 'all' | 'mine' = 'all';

  private api = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();

    if (this.role === 'client') {
      this.selectedView = 'mine';
    } else {
      this.selectedView = 'all';
    }

    this.loadJobs();
  }
 
  formatBudgetType(type: string): string {
  switch (type) {
    case 'hourly':
      return 'Paiement horaire';
    case 'fixed':
      return 'Prix fixe';
    default:
      return type || 'Budget non précisé';
  }
}

formatSize(size: string): string {
  switch (size) {
    case 'small':
      return 'Petit projet';
    case 'medium':
      return 'Projet moyen';
    case 'large':
      return 'Grand projet';
    default:
      return size || 'Taille non précisée';
  }
}


  ionViewWillEnter() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();
    this.loadJobs();
  }

  switchView(view: any) {
    if (view !== 'all' && view !== 'mine') {
      return;
    }

    this.selectedView = view;
    this.loadJobs();
  }

  loadJobs() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  let url = `${this.api}/api/jobs`;

  if (this.role === 'client' && this.selectedView === 'mine') {
    url = `${this.api}/api/jobs/my`;
  }

  this.http.get<any[]>(url, { headers }).subscribe({
    next: (data) => {
      this.jobs = data;
      this.applySearch();
    },
    error: (err) => console.error(err),
  });
}

  onSearch() {
    this.applySearch();
  }

  applySearch() {
    if (!this.searchTerm.trim()) {
      this.filteredJobs = [...this.jobs];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();

    this.filteredJobs = this.jobs.filter(j =>
      j.title?.toLowerCase().includes(term) ||
      j.category?.toLowerCase().includes(term) ||
      j.skills?.some((s: string) => s.toLowerCase().includes(term))
    );
  }
}