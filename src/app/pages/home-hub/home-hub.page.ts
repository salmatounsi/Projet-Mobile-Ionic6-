import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home-hub',
  template: '',
  standalone: false,
})
export class HomeHubPage implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    //const role = this.auth.getRole?.() ?? 'client';
    const role = localStorage.getItem("role");
    
    if (role === 'freelancer') {
      this.router.navigateByUrl('/tabs/jobs');
    } else {
      this.router.navigateByUrl('/tabs/services');
    }
  }
}