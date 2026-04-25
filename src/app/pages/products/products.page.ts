import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false
})
export class ProductsPage implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  role: string = '';
  selectedView: 'all' | 'mine' = 'all';

  constructor(
    private router: Router,
    private productApi: ProductApiService
  ) {}

  ngOnInit(): void {
    this.initPage();
  }

  ionViewWillEnter(): void {
    this.initPage();
  }

  initPage(): void {
    this.role = (localStorage.getItem('role') || '').toLowerCase().trim();

    if (this.role === 'freelancer' && !this.selectedView) {
      this.selectedView = 'mine';
    }

    if (this.role !== 'freelancer') {
      this.selectedView = 'all';
    }

    this.loadProducts();
  }

  switchView(view: any): void {
    if (view !== 'all' && view !== 'mine') {
      return;
    }

    this.selectedView = view;
    this.loadProducts();
  }

  loadProducts(): void {
    const request =
      this.role === 'freelancer' && this.selectedView === 'mine'
        ? this.productApi.getMyProducts()
        : this.productApi.getProducts();

    request.subscribe({
      next: (data: Product[]) => {
        this.products = data ?? [];
        this.applySearch();
      },
      error: (error: unknown) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  onSearchChange(): void {
    this.applySearch();
  }

  applySearch(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter((product: Product) =>
      (product.title || '').toLowerCase().includes(term) ||
      (product.seller_name || '').toLowerCase().includes(term) ||
      (product.seller_role || '').toLowerCase().includes(term) ||
      (product.license || '').toLowerCase().includes(term)
    );
  }

  goToNewProduct(): void {
    this.router.navigate(['/new-product']);
  }

  buyProduct(product: Product): void {
    console.log('Buy product:', product);
  }
}