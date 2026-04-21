import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {ProductSample,ServiceSample,JobSample} from "../models/Sample"
import {HttpClient} from "@angular/common/http";
import {HomeService} from "../services/home-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  services: ServiceSample[] = [];
  products: ProductSample[] = [];
  jobs: JobSample[] = [];
  private router = inject(Router);
  private serviceHome= inject(HomeService);

  isLoading = false;


  loadSamples(): void {
    this.isLoading = true;

    this.serviceHome.getSamples().subscribe(res =>
    {
      this.products.push(...res.samples.products)
      this.services.push(...res.samples.services)
    }
      ,error => {

    })

    this.isLoading = false;
  }
  login(): void {
    this.router.navigate(['/login']);
  }

  freelancer(): void {
    this.router.navigate(['/login']);
  }

  clientSignup(): void {
    this.router.navigate(['/login']);
  }

  browseServices(): void {
    this.router.navigate(['/services']);
  }

  browseProducts(): void {
    this.router.navigate(['/products']);
  }

  browseJobs(): void {
    this.router.navigate(['/jobs']);
  }

  postJob(): void {
    this.router.navigate(['/login']);
  }

  startSelling(): void {
    this.router.navigate(['/login']);
  }
  getImageUrl(path: string | null | undefined): string {
    if (!path) {
      return 'assets/placeholder.png';
    }

    // Replace with your backend base URL if needed
    return path.startsWith('http') ? path : path;
  }

  getShortDescription(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  trackById(index: number, item: { _id: string }): string {
    return item._id;
  }
  constructor() {}

  ngOnInit(): void {
    this.loadSamples();
  }

}
