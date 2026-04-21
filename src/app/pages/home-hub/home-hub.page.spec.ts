import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home-hub',
  template: '',
})
export class HomeHubPage implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const role = this.auth.getRole();
    if (role === 'freelancer') this.router.navigateByUrl('/tabs/jobs');
    else this.router.navigateByUrl('/tabs/services');
  }
}