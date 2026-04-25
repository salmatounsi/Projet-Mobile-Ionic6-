import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-info',
  standalone: false,
  templateUrl: './general-info.page.html',
  styleUrls: ['./general-info.page.scss'],
})
export class GeneralInfoPage implements OnInit {
  registerForm: FormGroup;

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

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);

    this.http.post<any>('http://localhost:5000/register', this.registerForm.value, {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        console.log('Success:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        this.router.navigateByUrl('/bio-cv');
      },
      error: (error) => {
        console.error('Register error:', error);
        alert(error.error?.error || 'Erreur lors de la création du compte');
      }
    });
  }
}