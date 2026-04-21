import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone : false,
  
})
export class TabsPage {
  role: 'client' | 'freelancer' | 'admin' = 'client';

  constructor(private auth: AuthService) {
    const r = this.auth.getRole?.() ?? null; // si getRole existe
    if (r) this.role = r;
  }
}