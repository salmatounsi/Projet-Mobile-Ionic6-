import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const payload = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.errorMessage = '';

        // ✅ IMPORTANT: entrer dans le layout Tabs pour garder le menu en bas
       this.router.navigateByUrl('/tabs/start', { replaceUrl: true });
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Email not found';
        } else if (err.status === 401) {
          this.errorMessage = 'Wrong password';
        } else {
          this.errorMessage = 'Login failed';
        }
        console.log(err);
      },
    });
  }

  constructor() {}

  ngOnInit() {}
}