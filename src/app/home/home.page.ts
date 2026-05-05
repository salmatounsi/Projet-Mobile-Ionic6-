import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductSample, ServiceSample, JobSample } from '../models/Sample';
import { HomeService } from '../services/home-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  services: ServiceSample[] = [];
  products: ProductSample[] = [];
  jobs:     JobSample[]     = [];
  isLoading = false;

  // ── Stats dynamiques ───────────────────────────────────────
  stats = {
    freelancers: 0,
    services:    0,
    jobs:        0,
    products:    0
  };

  private router      = inject(Router);
  private serviceHome = inject(HomeService);
  private http        = inject(HttpClient);

  private api = 'http://127.0.0.1:5000';

  ngOnInit(): void {
    this.loadSamples();
    this.loadStats();
  }

  // ── Samples pour les cards ─────────────────────────────────
  loadSamples(): void {
    this.isLoading = true;
    this.serviceHome.getSamples().subscribe({
      next: (res) => {
        this.products  = res.samples?.products || [];
        this.services  = res.samples?.services || [];
        this.jobs      = res.samples?.jobs     || [];
        this.isLoading = false;
      },
      error: () => {
        this.products  = [];
        this.services  = [];
        this.jobs      = [];
        this.isLoading = false;
      }
    });
  }

  // ── Stats réelles (endpoint public, pas de token requis) ───
  loadStats(): void {
    this.http.get<any>(`${this.api}/api/public/stats`).subscribe({
      next: (res) => {
        this.stats.freelancers = res.freelancers || 0;
        this.stats.services    = res.services    || 0;
        this.stats.jobs        = res.jobs        || 0;
        this.stats.products    = res.products    || 0;
      },
      error: () => {
        // Garde les valeurs à 0 si erreur
      }
    });
  }

  // ── Formatage des stats (ex: 1250 → "+1K") ────────────────
  formatStat(n: number): string {
    if (n >= 1000) return `+${Math.floor(n / 1000)}K`;
    if (n > 0)     return `+${n}`;
    return '0';
  }

  // ── Navigation ─────────────────────────────────────────────
  login()          { this.router.navigateByUrl('/login'); }
  freelancer()     { this.router.navigateByUrl('/login'); }
  clientSignup()   { this.router.navigateByUrl('/login'); }
  browseServices() { this.router.navigateByUrl('/login'); }
  browseProducts() { this.router.navigateByUrl('/login'); }
  browseJobs()     { this.router.navigateByUrl('/login'); }
  postJob()        { this.router.navigateByUrl('/login'); }
  startSelling()   { this.router.navigateByUrl('/login'); }

  // ── Helpers ────────────────────────────────────────────────
  getImageUrl(path: string | null | undefined): string {
    if (!path) return 'assets/placeholder.png';
    return path.startsWith('http') ? path : path;
  }

  getShortDescription(text: string, maxLength = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }
}