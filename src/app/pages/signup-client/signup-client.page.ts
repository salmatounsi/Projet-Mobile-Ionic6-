import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.page.html',
  standalone:false,
  styleUrls: ['./signup-client.page.scss'],
})
export class SignupClientPage implements OnInit {
passwordType: string = 'password';
passwordIcon: string = 'eye-off-outline';
registerForm: FormGroup; 

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) { 
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
      termsEmail: [false, Validators.requiredTrue],
      terms: [false, Validators.requiredTrue]

    });
  }

  ngOnInit() {
  }
togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }
onCreateAccount() {
  if (this.registerForm.invalid) {
    console.log('Form is invalid');
    this.registerForm.markAllAsTouched();
    return;
  }

  const formData = this.registerForm.value;

  this.http.post('http://localhost:5000/api/signup', formData)
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role || 'client');

        console.log('Signup client response:', res);
        console.log('Role saved:', localStorage.getItem('role'));

        alert('Compte créé avec succès');

        this.router.navigateByUrl('/choose-plan');
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err.error?.error || 'Une erreur est survenue');
      }
    });
}
}
