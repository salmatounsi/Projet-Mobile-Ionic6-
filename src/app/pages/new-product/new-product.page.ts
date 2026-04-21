import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { AuthService } from '../../services/auth-service';
import { ProfileService } from '../../services/profile-service';
import { User } from '../../models/User';

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
  userProfile: User | null = null;

  mainImageFile: File | null = null;
  galleryImageFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productApi: ProductApiService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      version: ['', Validators.required],
      license: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });

    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.profileService.fetchProfileData().subscribe({
      next: (profile: any) => {
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    });
  }

  onMainImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.mainImageFile = file;
    this.mainImagePreview = file.name;
  }

  onGalleryImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    this.galleryImageFiles = Array.from(files).slice(0, 3);
    this.galleryPreviews = this.galleryImageFiles.map(file => file.name);
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (!this.userProfile) {
      alert('User profile not loaded. Please try again.');
      return;
    }


    this.isSubmitting = true;

    const formData = new FormData();

    formData.append(
      'seller_name',
      `${this.userProfile.general_info?.first_name || ''} ${this.userProfile.general_info?.last_name || ''}`.trim() || 'Unknown'
    );
    formData.append('seller_role', this.userProfile.professional_role || 'Developer');
    formData.append('title', this.productForm.value.title);
    formData.append('description', this.productForm.value.description);
    formData.append('version', this.productForm.value.version);
    formData.append('license', this.productForm.value.license);
    formData.append('price', String(Number(this.productForm.value.price)));

    if (this.mainImageFile) {
      formData.append('main_image', this.mainImageFile);
    }

    this.galleryImageFiles.forEach((file) => {
      formData.append('gallery', file);
    });

    this.productApi.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Product created:', response);
        this.isSubmitting = false;
        this.productForm.reset();
        this.mainImagePreview = null;
        this.galleryPreviews = [];
        this.mainImageFile = null;
        this.galleryImageFiles = [];
        this.router.navigate(['/products']);
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        console.error('Error creating product:', error);
      }
    });
  }
}
