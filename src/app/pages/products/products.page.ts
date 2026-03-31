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

  constructor(
    private router: Router,
    private productApi: ProductApiService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ionViewWillEnter(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productApi.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data ?? [];
        this.filteredProducts = [...this.products];
      },
      error: (error: unknown) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  onSearchChange(): void {
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