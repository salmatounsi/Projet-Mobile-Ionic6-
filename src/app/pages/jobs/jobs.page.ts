import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  jobs:         any[] = [];
  filteredJobs: any[] = [];

  searchTerm   = '';
  role         = '';
  selectedView: 'all' | 'mine' = 'all';

  // ── Filtres ────────────────────────────────────────────────
  showFilters = false;
  filters = {
    budgetType: '',
    size:       '',
    budgetMin:  null as number | null,
    budgetMax:  null as number | null,
    sort:       'recent' as 'recent' | 'budget_asc' | 'budget_desc'
  };

  private api = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();
    this.selectedView = this.role === 'client' ? 'mine' : 'all';
    this.loadJobs();
  }

  ionViewWillEnter() {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();
    this.loadJobs();
  }

  // ── Chargement ─────────────────────────────────────────────
  loadJobs() {
    const token   = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const url     = this.role === 'client' && this.selectedView === 'mine'
      ? `${this.api}/api/jobs/my`
      : `${this.api}/api/jobs`;

    this.http.get<any[]>(url, { headers }).subscribe({
      next:  (data) => { this.jobs = data; this.applyFilters(); },
      error: (err)  => console.error(err)
    });
  }

  // ── Filtres + recherche ────────────────────────────────────
  applyFilters() {
    let result = [...this.jobs];

    // Recherche texte
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      result = result.filter(j =>
        j.title?.toLowerCase().includes(term) ||
        j.skills?.some((s: string) => s.toLowerCase().includes(term))
      );
    }

    // Type de budget
    if (this.filters.budgetType) {
      result = result.filter(j => j.budgetType === this.filters.budgetType);
    }

    // Taille du projet
    if (this.filters.size) {
      result = result.filter(j => j.size === this.filters.size);
    }

    // Budget min
    if (this.filters.budgetMin !== null && this.filters.budgetMin !== undefined) {
      result = result.filter(j => Number(j.budgetTo) >= Number(this.filters.budgetMin));
    }

    // Budget max
    if (this.filters.budgetMax !== null && this.filters.budgetMax !== undefined) {
      result = result.filter(j => Number(j.budgetFrom) <= Number(this.filters.budgetMax));
    }

    // Tri
    if (this.filters.sort === 'budget_asc') {
      result.sort((a, b) => Number(a.budgetFrom) - Number(b.budgetFrom));
    } else if (this.filters.sort === 'budget_desc') {
      result.sort((a, b) => Number(b.budgetTo) - Number(a.budgetTo));
    } else {
      // Plus récent par défaut
      result.sort((a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    this.filteredJobs = result;
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filters.budgetType ||
      this.filters.size ||
      this.filters.budgetMin ||
      this.filters.budgetMax ||
      this.filters.sort !== 'recent' ||
      this.searchTerm.trim()
    );
  }

  resetFilters() {
    this.searchTerm  = '';
    this.filters = {
      budgetType: '',
      size:       '',
      budgetMin:  null,
      budgetMax:  null,
      sort:       'recent'
    };
    this.applyFilters();
  }

  // ── Navigation ─────────────────────────────────────────────
  switchView(view: any) {
    if (view !== 'all' && view !== 'mine') return;
    this.selectedView = view;
    this.loadJobs();
  }

  goToApply(jobId: string) {
    this.router.navigate(['/apply-job', jobId]);
  }

  goToApplications(jobId: string) {
    this.router.navigate(['/job-applications', jobId]);
  }

  // ── Formatage ──────────────────────────────────────────────
  formatBudgetType(type: string): string {
    return ({ hourly: 'Paiement horaire', fixed: 'Prix fixe' } as any)[type] || type || 'Non précisé';
  }

  formatSize(size: string): string {
    return ({ small: 'Petit projet', medium: 'Projet moyen', large: 'Grand projet' } as any)[size] || size || 'Non précisée';
  }
}