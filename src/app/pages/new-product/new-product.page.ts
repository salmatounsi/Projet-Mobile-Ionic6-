import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiService, Product } from '../../services/product-api.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  standalone: false
})
export class NewProductPage implements OnInit {
  productForm!: FormGroup;

  mainImagePreview: string | null = null;
  galleryPreviews: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productApi: ProductApiService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      version: ['', Validators.required],
      license: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onMainImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.mainImagePreview = file.name;
  }

  onGalleryImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    this.galleryPreviews = Array.from(files)
      .slice(0, 3)
      .map((file) => file.name);
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const productPayload: Product = {
      seller_id: '123',
      seller_name: 'Anna THEGOLD',
      seller_role: 'Web Developer',
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      version: this.productForm.value.version,
      license: this.productForm.value.license,
      price: Number(this.productForm.value.price),
      main_image: this.mainImagePreview || '',
      gallery: this.galleryPreviews
    };

    this.productApi.createProduct(productPayload).subscribe({
      next: (response: Product) => {
        console.log('Product created:', response);
        this.isSubmitting = false;
        this.productForm.reset();
        this.mainImagePreview = null;
        this.galleryPreviews = [];
        this.router.navigate(['/products']);
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        console.error('Error creating product:', error);
      }
    });
  }
}