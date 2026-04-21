import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth-service";

@Component({
  selector: 'app-general-info',
  standalone: false,
  templateUrl: './general-info.page.html',
  styleUrls: ['./general-info.page.scss'],
})
export class GeneralInfoPage implements OnInit {
  registerForm: FormGroup;
  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];

    if (!file) return;

    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    formData.append('firstName', this.registerForm.get('firstName')?.value);
    formData.append('lastName', this.registerForm.get('lastName')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('country', this.registerForm.get('country')?.value);

    if (this.selectedImageFile) {
      formData.append('profile_image', this.selectedImageFile);
    }

    this.http.post('http://127.0.0.1:5000/register', formData, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/what-dyd']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
