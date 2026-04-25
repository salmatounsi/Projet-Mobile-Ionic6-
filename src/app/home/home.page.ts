import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  jobs: JobSample[] = [];

  isLoading = false;

  private router = inject(Router);
  private serviceHome = inject(HomeService);

  constructor() {}

  ngOnInit(): void {
    this.loadSamples();
  }

  loadSamples(): void {
    this.isLoading = true;

    this.serviceHome.getSamples().subscribe({
      next: (res) => {
        this.products = res.samples?.products || [];
        this.services = res.samples?.services || [];
        this.jobs = res.samples?.jobs || [];

        console.log('Home products:', this.products);
        console.log('Home services:', this.services);
        console.log('Home jobs:', this.jobs);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading home samples:', error);

        this.products = [];
        this.services = [];
        this.jobs = [];

        this.isLoading = false;
      }
    });
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  freelancer(): void {
    this.router.navigateByUrl('/login');
  }

  clientSignup(): void {
    this.router.navigateByUrl('/login');
  }

  browseServices(): void {
    this.router.navigateByUrl('/login');
  }

  browseProducts(): void {
    this.router.navigateByUrl('/login');
  }

  browseJobs(): void {
    this.router.navigateByUrl('/login');
  }

  postJob(): void {
    this.router.navigateByUrl('/login');
  }

  startSelling(): void {
    this.router.navigateByUrl('/login');
  }

  getImageUrl(path: string | null | undefined): string {
    if (!path) {
      return 'assets/placeholder.png';
    }

    return path.startsWith('http') ? path : path;
  }

  getShortDescription(text: string, maxLength: number = 100): string {
    if (!text) {
      return '';
    }

    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }
}